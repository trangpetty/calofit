package com.example.calofit_app.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@RequestMapping("/users")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Tạo một cục dữ liệu JSON để trả về
        Map<String, Object> profileData = new HashMap<>();
        profileData.put("email", authentication.getName()); // Lấy email
        profileData.put("roles", authentication.getAuthorities()); // Lấy danh sách quyền (ROLE_USER, ROLE_PT...)
        profileData.put("message", "Chào mừng bạn đến với khu vực tuyệt mật của Calofit!");

        return ResponseEntity.ok(profileData);
    }
}
