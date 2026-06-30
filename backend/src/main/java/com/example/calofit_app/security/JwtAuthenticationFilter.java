package com.example.calofit_app.security;


import com.example.calofit_app.dto.ApiResponse;
import com.example.calofit_app.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import tools.jackson.databind.ObjectMapper;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final ObjectMapper objectMapper;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, ObjectMapper objectMapper) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.objectMapper = objectMapper;
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

        if (request.getServletPath().contains("/api/v1/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 1. Kiểm tra xem Request có chứa header Authorization mang chuẩn Bearer không
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Không có thì cho qua (để Security config quyết định chặn hay không)
            return;
        }

        // 2. Cắt bỏ chữ "Bearer " để lấy cái Token lõi
        jwt = authHeader.substring(7);
        try {
            userEmail = jwtService.extractEmail(jwt);
            String roleString = jwtService.extractRole(jwt);
            System.out.println("Debug JWT Filter - Email: " + userEmail + " | Role: " + roleString);
            // 3. Nếu lấy được email và hiện tại Security Context chưa ghi nhận ai đăng nhập
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 4. Kiểm tra xem Token còn hạn và hợp lệ không
                if (jwtService.isTokenValid(jwt, userEmail)) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    //                String safeRole = (roleString != null && !roleString.isEmpty()) ? roleString : "USER";
                    //                List<SimpleGrantedAuthority> authorities = Arrays.stream(safeRole.split(","))
                    //                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.trim().toUpperCase()))
                    //                        .collect(Collectors.toList());
                    //                // Tạo một cái "thẻ tên" gắn Role cho user này
                    //                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    //                        userEmail,
                    //                        null,
                    //                        authorities
                    //                );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Gắn "thẻ tên" vào Context để Spring Security biết là user này đã xác thực
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    logger.info("Request path: " + request.getServletPath());

                }
            }
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");

            ApiResponse<Object> apiResponse = ApiResponse.builder()
                    .code(401)
                    .message("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
                    .build();
            response.getWriter().write(objectMapper.writeValueAsString(apiResponse));

            return;
        } catch (Exception e) {
            // Xử lý các lỗi token khác (sai chữ ký, token hỏng...)
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"errorCode\": \"INVALID_TOKEN\", \"message\": \"Token không hợp lệ.\"}");
            return;
        }

        // Cho phép request đi tiếp vào Controller
        filterChain.doFilter(request, response);
    }
}
