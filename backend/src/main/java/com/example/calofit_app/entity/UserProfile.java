package com.example.calofit_app.entity;

import com.example.calofit_app.entity.enums.ActivityLevel;
import com.example.calofit_app.entity.enums.Gender;
import com.example.calofit_app.entity.enums.Goal;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Liên kết 1-1 với bảng users
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false, unique = true)
    private User user;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private Double weight; // Cân nặng (kg)

    @Column(nullable = false)
    private Double height; // Chiều cao (cm)

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = false)
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Goal goal;

    // --- CÁC CHỈ SỐ HỆ THỐNG TỰ TÍNH TOÁN ---

    @Column(name = "bmr")
    private Double bmr; // Năng lượng tiêu hao lúc nghỉ ngơi

    @Column(name = "tdee")
    private Double tdee; // Tổng năng lượng tiêu hao 1 ngày

    @Column(name = "daily_calories_goal")
    private Double dailyCaloriesGoal; // Mục tiêu Calo cần nạp (Dựa vào Goal)

    @Column(name = "bmi")
    private Double bmi; // Chỉ số khối cơ thể

    @Column(name = "protein_target")
    private Double proteinTarget; // (Gram)

    @Column(name = "carbs_target")
    private Double carbsTarget; // (Gram)

    @Column(name = "fat_target")
    private Double fatTarget; // (Gram)

    @Column(name = "start_weight", nullable = false)
    private Double startWeight;
    // Cân nặng lúc vừa đăng ký (Dùng làm mốc 0% để tính phần trăm tiến độ)

    @Column(name = "target_weight")
    private Double targetWeight;
    // Cân nặng mục tiêu (Dùng làm mốc 100%. Nếu goal là MAINTAIN thì bằng luôn startWeight)

    @Column(name = "current_weight")
    private Double currentWeight;

    @Column(name = "weekly_goal_rate")
    private Double weeklyGoalRate;
    // Tốc độ thay đổi (kg/tuần). Ví dụ: 0.25, 0.5, 0.75, 1.0.
    // Dùng để tính toán "Projected date" (ngày dự kiến) và chia "Weekly target"

    @Column(name = "start_date")
    private LocalDateTime startDate;
}
