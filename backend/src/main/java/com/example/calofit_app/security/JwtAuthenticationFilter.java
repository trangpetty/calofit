package com.example.calofit_app.security;


import com.example.calofit_app.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal (
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Kiểm tra xem Request có chứa header Authorization mang chuẩn Bearer không
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Không có thì cho qua (để Security config quyết định chặn hay không)
            return;
        }

        // 2. Cắt bỏ chữ "Bearer " để lấy cái Token lõi
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractEmail(jwt);
        String roleString = jwtService.extractRole(jwt);
        System.out.println("Debug JWT Filter - Email: " + userEmail + " | Role: " + roleString);
        // 3. Nếu lấy được email và hiện tại Security Context chưa ghi nhận ai đăng nhập
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 4. Kiểm tra xem Token còn hạn và hợp lệ không
            if (jwtService.isTokenValid(jwt, userEmail)) {
                List<SimpleGrantedAuthority> authorities = Arrays.stream(roleString.split(","))
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.trim().toUpperCase()))
                        .collect(Collectors.toList());
                // Tạo một cái "thẻ tên" gắn Role cho user này
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userEmail,
                        null,
                        authorities
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Gắn "thẻ tên" vào Context để Spring Security biết là user này đã xác thực
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Cho phép request đi tiếp vào Controller
        filterChain.doFilter(request, response);
    }
}
