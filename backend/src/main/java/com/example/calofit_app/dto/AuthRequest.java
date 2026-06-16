package com.example.calofit_app.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
    private String displayName; // Chỉ dùng khi Đăng ký
    private String role;        // "USER" hoặc "PT" (Chỉ dùng khi Đăng ký)
}
