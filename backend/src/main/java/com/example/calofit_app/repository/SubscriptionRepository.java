package com.example.calofit_app.repository;

import com.example.calofit_app.entity.Subscription;
import com.example.calofit_app.entity.enums.SubscriptionStatus;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END " +
            "FROM Subscription s " +
            "WHERE s.user.id = :userId " +
            "AND s.status = :status " +
            "AND s.planType = 'PREMIUM'" +
            "AND s.endDate > CURRENT_TIMESTAMP")
    boolean hasActivePremium(@Param("userId") Long userId, @Param("status")SubscriptionStatus status);
}
