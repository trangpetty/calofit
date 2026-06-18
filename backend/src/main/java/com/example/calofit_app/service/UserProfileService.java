package com.example.calofit_app.service;

import com.example.calofit_app.dto.UserProfileRequest;
import com.example.calofit_app.entity.User;
import com.example.calofit_app.entity.UserProfile;
import com.example.calofit_app.entity.enums.Gender;
import com.example.calofit_app.entity.enums.Goal;
import com.example.calofit_app.repository.UserProfileRepository;
import com.example.calofit_app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {
    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    public UserProfileService(UserProfileRepository userProfileRepository, UserRepository userRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public UserProfile createUserProfile(String email, UserProfileRequest  request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        double bmr;
        if (request.getGender() == Gender.MALE) {
            bmr = (10 * request.getWeight()) + (6.25 * request.getHeight()) - (5 * request.getAge()) + 5;
        } else {
            bmr = (10 * request.getWeight()) + (6.25 * request.getHeight()) - (5 * request.getAge()) - 161;
        }

        // 2. Tính TDEE dựa trên hệ số vận động (Activity Multiplier)
        double activityMultiplier = switch (request.getActivityLevel()) {
            case SEDENTARY -> 1.2;          // Ít vận động
            case LIGHTLY_ACTIVE -> 1.375;    // Vận động nhẹ
            case MODERATELY_ACTIVE -> 1.55;  // Vận động vừa
            case VERY_ACTIVE -> 1.725;       // Vận động nhiều
            case EXTRA_ACTIVE -> 1.9;        // Vận động cực nhiều
        };
        double tdee = bmr * activityMultiplier;

        // 3. Tính mục tiêu Calo hàng ngày dựa trên Goal (Mục tiêu hình thể)
        double dailyCaloriesGoal = switch (request.getGoal()) {
            case LOSE_WEIGHT -> tdee - 500;    // Giảm cân: Thâm hụt 500 kcal
            case MAINTAIN_WEIGHT -> tdee;      // Giữ cân: Bằng TDEE
            case GAIN_MUSCLE -> tdee + 300;    // Tăng cơ: Thặng dư 300 kcal
        };

        // Tính BMI = Cân nặng (kg) / (Chiều cao(m) * Chiều cao(m))
        double heightInMeter = request.getHeight() / 100.0;
        double bmi = request.getWeight() / (heightInMeter * heightInMeter);

        // Tính Macros (Tỷ lệ phân bổ Calo chuẩn tham khảo)
        // 1g Protein = 4 kcal, 1g Carbs = 4 kcal, 1g Fat = 9 kcal
        double proteinRatio = 0.3; // Mặc định 30% Calo từ Đạm
        double carbsRatio = 0.4;   // Mặc định 40% Calo từ Tinh bột
        double fatRatio = 0.3;     // Mặc định 30% Calo từ Chất béo

        // Tinh chỉnh tỷ lệ theo mục tiêu
        if (request.getGoal() == Goal.LOSE_WEIGHT) {
            proteinRatio = 0.4; carbsRatio = 0.3; fatRatio = 0.3; // Giảm cân: Tăng đạm, giảm tinh bột
        } else if (request.getGoal() == Goal.GAIN_MUSCLE) {
            proteinRatio = 0.3; carbsRatio = 0.5; fatRatio = 0.2; // Tăng cơ: Tăng tinh bột để có sức tập
        }

        double proteinTarget = (dailyCaloriesGoal * proteinRatio) / 4.0;
        double carbsTarget = (dailyCaloriesGoal * carbsRatio) / 4.0;
        double fatTarget = (dailyCaloriesGoal * fatRatio) / 9.0;

        // 4. Tìm xem đã có profile chưa, nếu có thì cập nhật, chưa có thì tạo mới (Upsert)
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElse(new UserProfile());

        profile.setUser(user);
        profile.setAge(request.getAge());
        profile.setGender(request.getGender());
        profile.setHeight(request.getHeight());
        profile.setWeight(request.getWeight());
        profile.setActivityLevel(request.getActivityLevel());
        profile.setGoal(request.getGoal());
        profile.setBmr(Math.round(bmr * 10.0) / 10.0); // Làm tròn 1 chữ số thập phân
        profile.setTdee(Math.round(tdee * 10.0) / 10.0);
        profile.setDailyCaloriesGoal(Math.round(dailyCaloriesGoal * 10.0) / 10.0);
        profile.setBmi(Math.round(bmi * 10.0) / 10.0);
        profile.setProteinTarget((double) Math.round(proteinTarget));
        profile.setCarbsTarget((double) Math.round(carbsTarget));
        profile.setFatTarget((double) Math.round(fatTarget));

        return userProfileRepository.save(profile);
    }

    public UserProfile getProfileByEmail(String email) {
        return userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
