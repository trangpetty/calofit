package com.example.calofit_app.ratelimit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.Refill;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RateLimitingService {
    @Value("${REDIS_URL}")
    private String redisUrl;

    @Value("${spring.data.redis.host:localhost}")
    private String redisHost;

    @Value("${spring.data.redis.port:6379}")
    private String redisPort;

    private RedisClient redisClient;
    private StatefulRedisConnection<byte[], byte[]> redisConnection;
    private LettuceBasedProxyManager proxyManager;

    @PostConstruct
    public void init() {
        // Khởi tạo kết nối Redis
        RedisURI redisUri = RedisURI.create(redisUrl);
        redisUri.setVerifyPeer(true);
        redisClient = RedisClient.create(redisUri);
        redisConnection = redisClient.connect(new io.lettuce.core.codec.ByteArrayCodec());

        // Khởi tạo trình quản lý Proxy của Bucket4j đẩy dữ liệu vào Redis
        proxyManager = LettuceBasedProxyManager.builderFor(redisConnection)
                .withExpirationStrategy(io.github.bucket4j.distributed.ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(Duration.ofMinutes(1)))
                .build();
    }

    @PreDestroy
    public void cleanup() {
        if (redisConnection != null) redisConnection.close();
        if (redisClient != null) redisClient.shutdown();
    }

    /**
     * Hàm lấy xô (Bucket) dựa trên địa chỉ IP hoặc Email.
     * Cấu hình: 20 request / 1 phút.
     */
    public Bucket resolveBucket(String key) {
        // Cấu hình: Xô chứa tối đa 20 token, nạp lại 20 token mỗi 1 phút
        Refill refill = Refill.intervally(20, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(20, refill);
        BucketConfiguration configuration = BucketConfiguration.builder()
                .addLimit(limit)
                .build();

        // Lấy xô từ Redis dựa trên Key, nếu chưa có thì tạo mới với cấu hình trên
        return proxyManager.builder().build(key.getBytes(), configuration);
    }
}
