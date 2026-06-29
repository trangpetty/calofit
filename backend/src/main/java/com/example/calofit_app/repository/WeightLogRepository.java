package com.example.calofit_app.repository;

import com.example.calofit_app.entity.WeightLog;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface WeightLogRepository extends JpaRepository<WeightLog, Integer> {

    Optional<WeightLog> findByUserIdAndLoggedDate(Long userId, LocalDate loggedDate);
    @Query("""
    SELECT w FROM WeightLog w
        WHERE w.user.id = :userId
          AND w.loggedDate >= :fromDate
        ORDER BY w.loggedDate DESC
        """)
    List<WeightLog> findRecentLogs(
            @Param("userId") Long userId,
            @Param("fromDate") LocalDate fromDate
    );

    @Query("""
        SELECT
            (SELECT w1.weight FROM WeightLog w1
             WHERE w1.user.id = :userId
             ORDER BY w1.loggedDate DESC LIMIT 1)
            -
            (SELECT w2.weight FROM WeightLog w2
             WHERE w2.user.id = :userId
               AND w2.loggedDate <= :sevenDaysAgo
             ORDER BY w2.loggedDate DESC LIMIT 1)
        """)
    Optional<Double> findWeeklyChange(
            @Param("userId") Long userId,
            @Param("sevenDaysAgo") LocalDate sevenDaysAgo
    );
}
