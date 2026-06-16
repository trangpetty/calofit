package com.example.calofit_app.service;

import com.example.calofit_app.dto.AuthRequest;
import com.example.calofit_app.dto.AuthResponse;
import com.example.calofit_app.entity.User;
import com.example.calofit_app.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public AuthResponse register(AuthRequest authRequest) {
        if (userRepository.findByEmail(authRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(authRequest.getEmail());
        user.setPasswordHash(passwordEncoder.encode(authRequest.getPassword()));
        user.setDisplayName(authRequest.getDisplayName());
        user.setRole(authRequest.getRole() != null ? authRequest.getRole() : "USER");

        userRepository.save(user);

        return generateToken(user.getEmail(),  user.getRole());
    }

    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Password not match");
        }

        return generateToken(user.getEmail(), user.getRole());
    }

    public AuthResponse refreshToken(String refreshToken) {
        // 1. Trích xuất email từ token gửi lên
        String email = jwtService.extractEmail(refreshToken);
        // 2. Lấy Token hợp lệ đang lưu dưới kho Redis lên
        String tokenInRedis = refreshTokenService.getRefreshToken(email);
        // 3. Kiểm tra xem Token gửi lên có khớp với Token trong kho không
        if (tokenInRedis == null || !tokenInRedis.equals(refreshToken)) {
            // NẾU KHÔNG KHỚP: Có dấu hiệu hacker dùng lại token cũ!
            // Lập tức xóa sạch token trong Redis để bảo vệ tài khoản
            refreshTokenService.deleteRefreshToken(email);
            throw new RuntimeException("Refresh token not valid! Please try again");
        }
        // 4. Nếu hợp lệ: Xóa Token cũ đi (Rotation)
        refreshTokenService.deleteRefreshToken(email);
        // 5. Lấy Role của User từ Database để tạo lại Token mới
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        // 6. Cấp phát cặp Token hoàn toàn mới và lưu lại vào Redis
        return generateToken(user.getEmail(), user.getRole());
    }

    private AuthResponse generateToken(String email, String role) {
        String accessToken = jwtService.generateAccessToken(email, role);
        String refreshToken = jwtService.generateRefreshToken(email);

        refreshTokenService.saveRefreshToken(email, refreshToken);

        return new AuthResponse(accessToken, refreshToken, email, role);
    }
}
