package com.example.calofit_app.service;

import com.example.calofit_app.dto.UserProfileRequest;
import com.example.calofit_app.entity.User;
import com.example.calofit_app.entity.UserProfile;
import com.example.calofit_app.entity.enums.Gender;
import com.example.calofit_app.entity.enums.Goal;
import com.example.calofit_app.repository.UserProfileRepository;
import com.example.calofit_app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Slf4j
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
            case SEDENTARY -> 1.2;
            case LIGHTLY_ACTIVE -> 1.375;
            case MODERATELY_ACTIVE -> 1.55;
            case VERY_ACTIVE -> 1.725;
            case EXTRA_ACTIVE -> 1.9;
        };
        double tdee = bmr * activityMultiplier;

        // 3. Tính mục tiêu Calo hàng ngày dựa trên Goal (Mục tiêu hình thể)
        double calorieDifferencePerDay = 0;
        if (request.getWeeklyGoalRate() != null && request.getWeeklyGoalRate() > 0) {
            calorieDifferencePerDay = (request.getWeeklyGoalRate() * 7700) / 7.0;
        }

        double dailyCaloriesGoal = switch (request.getGoal()) {
            case LOSE_WEIGHT -> tdee - calorieDifferencePerDay;
            case MAINTAIN_WEIGHT -> tdee;
            case GAIN_MUSCLE -> tdee + calorieDifferencePerDay;
        };

        // Đảm bảo lượng calo nạp vào không xuống dưới mức nguy hiểm (Nữ: 1200, Nam: 1500)
        double minCalories = (request.getGender() == Gender.FEMALE) ? 1200.0 : 1500.0;
        if (dailyCaloriesGoal < minCalories) {
            dailyCaloriesGoal = minCalories;
        }

        double maxCalories = tdee + 500;
        if (request.getGoal() == Goal.GAIN_MUSCLE && dailyCaloriesGoal > maxCalories) {
            dailyCaloriesGoal = maxCalories;
        }


        // Tính BMI = Cân nặng (kg) / (Chiều cao(m) * Chiều cao(m))
        double heightInMeter = request.getHeight() / 100.0;
        double bmi = request.getWeight() / (heightInMeter * heightInMeter);

        // Tính Macros
        double proteinRatio = 0.3;
        double carbsRatio = 0.4;
        double fatRatio = 0.3;

        if (request.getGoal() == Goal.LOSE_WEIGHT) {
            proteinRatio = 0.4; carbsRatio = 0.3; fatRatio = 0.3;
        } else if (request.getGoal() == Goal.GAIN_MUSCLE) {
            proteinRatio = 0.3; carbsRatio = 0.5; fatRatio = 0.2;
        }

        double proteinTarget = (dailyCaloriesGoal * proteinRatio) / 4.0;
        double carbsTarget = (dailyCaloriesGoal * carbsRatio) / 4.0;
        double fatTarget = (dailyCaloriesGoal * fatRatio) / 9.0;

        double minProtein = request.getWeight() * 1.6;
        if (proteinTarget < minProtein) {
            proteinTarget = minProtein;
            // Redistribute calories còn lại cho carbs/fat
            double remainingCalories = dailyCaloriesGoal - (proteinTarget * 4);
            carbsTarget = (remainingCalories * 0.55) / 4.0;
            fatTarget   = (remainingCalories * 0.45) / 9.0;
        }

        // Debug check — xóa khi production
        double totalMacroCals = (proteinTarget * 4) + (carbsTarget * 4) + (fatTarget * 9);
        assert Math.abs(totalMacroCals - dailyCaloriesGoal) < 5 : "Macro mismatch!";

        // 4. Upsert Profile
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElse(new UserProfile());

        profile.setUser(user);
        profile.setAge(request.getAge());
        profile.setGender(request.getGender());
        profile.setHeight(request.getHeight());
        profile.setWeight(request.getWeight());
        profile.setActivityLevel(request.getActivityLevel());
        profile.setGoal(request.getGoal());

        profile.setTargetWeight(request.getTargetWeight());
        profile.setWeeklyGoalRate(request.getWeeklyGoalRate());

        profile.setBmr(Math.round(bmr * 10.0) / 10.0); // Làm tròn 1 chữ số thập phân
        profile.setTdee(Math.round(tdee * 10.0) / 10.0);
        profile.setDailyCaloriesGoal(Math.round(dailyCaloriesGoal * 10.0) / 10.0);
        profile.setBmi(Math.round(bmi * 10.0) / 10.0);
        profile.setProteinTarget((double) Math.round(proteinTarget));
        profile.setCarbsTarget((double) Math.round(carbsTarget));
        profile.setFatTarget((double) Math.round(fatTarget));
        profile.setStartWeight(request.getWeight());
        profile.setStartDate(LocalDateTime.now());

        log.info("Profile saved: " + profile.toString());
        return userProfileRepository.save(profile);
    }

    public UserProfile getProfileByEmail(String email) {
        return userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
