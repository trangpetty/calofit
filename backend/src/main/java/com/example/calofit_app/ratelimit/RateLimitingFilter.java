package com.example.calofit_app.ratelimit;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final RateLimitingService rateLimitingService;

    public RateLimitingFilter(RateLimitingService rateLimitingService) {
        this.rateLimitingService = rateLimitingService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Lấy địa chỉ IP của người dùng để làm Key định danh
        String clientIp = request.getRemoteAddr();

        // Lấy cái xô của IP này ra từ Redis
        Bucket bucket = rateLimitingService.resolveBucket(clientIp);

        // 2. Cố gắng lấy 1 token từ xô (tryConsumeAndReturnRemaining)
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            // NẾU CÒN TOKEN: Cho qua, đồng thời đính kèm số token còn lại vào Header (Best practice)
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            filterChain.doFilter(request, response);
        } else {
            // NẾU HẾT TOKEN: Chém ngay lập tức, trả về mã 429
            long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000; // Đổi từ Nano giây sang Giây
            response.addHeader("X-Rate-Limit-Retry-After-Seconds", String.valueOf(waitForRefill));
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value()); // HTTP 429
            response.setContentType("application/json; charset=UTF-8");
            response.getWriter().write("{\"error\": \"Bạn thao tác quá nhanh! Vui lòng thử lại sau " + waitForRefill + " giây.\"}");
        }
    }
}