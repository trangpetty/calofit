package com.example.calofit_app.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RefreshTokenService {
    private final StringRedisTemplate redisTemplate;
    private static final long REFRESH_TOKEN_EXPIRATION_DAYS = 7;
    public RefreshTokenService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // 1. Lưu Token mới vào Redis (Tự động bốc hơi sau 7 ngày)
    public void saveRefreshToken(String email, String token) {
        // Key lưu trong Redis sẽ có dạng "RT:user@gmail.com"
        redisTemplate.opsForValue().set("RT:" + email, token, REFRESH_TOKEN_EXPIRATION_DAYS, TimeUnit.DAYS);
    }

    // 2. Lấy Token từ Redis ra để đối chiếu
    public String getRefreshToken(String email) {
        return redisTemplate.opsForValue().get("RT:" + email);
    }

    // 3. Xóa Token (Dùng khi User đăng xuất hoặc phát hiện Hacker)
    public void deleteRefreshToken(String email) {
        redisTemplate.opsForValue().get("RT:" + email);
    }
}
