package com.example.calofit_app.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthResponse {
    private Long id;
    private String accessToken;
    private String refreshToken;
    private String email;
    private String role;

    public AuthResponse(Long id, String email, String accessToken) {
        this.id = id;
        this.email = email;
        this.accessToken = accessToken;
    }

    public AuthResponse(String refreshToken, String accessToken, String email, String role) {
        this.refreshToken = refreshToken;
        this.role = role;
        this.email = email;
        this.accessToken = accessToken;
    }
}
