package com.example.calofit_app.service;

import com.example.calofit_app.dto.AuthRequest;
import com.example.calofit_app.dto.AuthResponse;
import com.example.calofit_app.entity.enums.SubscriptionStatus;
import com.example.calofit_app.entity.User;
import com.example.calofit_app.repository.SubscriptionRepository;
import com.example.calofit_app.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @Value(("${app.google.client-id}"))
    private String googleClientId;

    public AuthService(UserRepository userRepository, SubscriptionRepository subscriptionRepository, PasswordEncoder passwordEncoder, JwtService jwtService, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
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

        return generateToken(user);
    }

    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Password not match");
        }

        return generateToken(user);
    }

    public AuthResponse googleLogin(String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier= new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken == null) {
                throw new RuntimeException("Id token verification failed");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setDisplayName(name);
                user.setRole("USER");

                user.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
                userRepository.save(user);
            }

            return  generateToken(user);
        } catch (Exception e) {
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        }
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
        return generateToken(user);
    }

    private AuthResponse generateToken(User user) {

        List<String> authorities = new ArrayList<>();
        authorities.add(user.getRole());

        if(user.getRole() != null && user.getRole().contains("USER")) {
            boolean hasActivePremium = subscriptionRepository.hasActivePremium(user.getId(), SubscriptionStatus.ACTIVE);

            if(hasActivePremium) {
                authorities.add("PREMIUM");
            }
        } else {
            System.out.println("3. Bỏ qua soi DB vì Role không phải là USER");
        }

        String roleString = String.join(",", authorities);


        String accessToken = jwtService.generateAccessToken(user.getEmail(), roleString);
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        refreshTokenService.saveRefreshToken(user.getEmail(), refreshToken);

        return new AuthResponse(accessToken, refreshToken, user.getEmail(), roleString);
    }
}
