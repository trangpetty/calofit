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

        profile.setStartWeight(request.getWeight());
        profile.setStartDate(LocalDateTime.now());
        calculateProfileMetrics(profile);

        log.info("Profile saved: " + profile.toString());
        return userProfileRepository.save(profile);
    }

    @Transactional
    public UserProfile updatePartialProfile(String email, UserProfileRequest request) {
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        boolean needRecalculate = false;

        if (request.getAge() != null) { profile.setAge(request.getAge()); needRecalculate = true; }
        if (request.getGender() != null) { profile.setGender(request.getGender()); needRecalculate = true; }
        if (request.getHeight() != null) { profile.setHeight(request.getHeight()); needRecalculate = true; }
        if (request.getWeight() != null) { profile.setWeight(request.getWeight()); needRecalculate = true; }
        if (request.getActivityLevel() != null) { profile.setActivityLevel(request.getActivityLevel()); needRecalculate = true; }
        if (request.getGoal() != null) { profile.setGoal(request.getGoal()); needRecalculate = true; }
        if (request.getWeeklyGoalRate() != null) { profile.setWeeklyGoalRate(request.getWeeklyGoalRate()); needRecalculate = true; }

        if (request.getTargetWeight() != null) { profile.setTargetWeight(request.getTargetWeight()); }
        if (request.getStartDate() != null) { profile.setStartDate(request.getStartDate().atStartOfDay()); } // Giả sử startDate trong Entity là LocalDateTime

        if (needRecalculate) {
            calculateProfileMetrics(profile);
        }

        log.info("Profile updated: " + profile.toString());
        return userProfileRepository.save(profile);
    }

    public UserProfile getProfileByEmail(String email) {
        return userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private void calculateProfileMetrics(UserProfile profile) {
        double bmr;
        if (profile.getGender() == Gender.MALE) {
            bmr = (10 * profile.getWeight()) + (6.25 * profile.getHeight()) - (5 * profile.getAge()) + 5;
        } else {
            bmr = (10 * profile.getWeight()) + (6.25 * profile.getHeight()) - (5 * profile.getAge()) - 161;
        }

        double activityMultiplier = switch (profile.getActivityLevel()) {
            case SEDENTARY -> 1.2;
            case LIGHTLY_ACTIVE -> 1.375;
            case MODERATELY_ACTIVE -> 1.55;
            case VERY_ACTIVE -> 1.725;
            case EXTRA_ACTIVE -> 1.9;
        };
        double tdee = bmr * activityMultiplier;

        double calorieDifferencePerDay = 0;
        if (profile.getWeeklyGoalRate() != null && profile.getWeeklyGoalRate() > 0) {
            calorieDifferencePerDay = (profile.getWeeklyGoalRate() * 7700) / 7.0;
        }

        double dailyCaloriesGoal = switch (profile.getGoal()) {
            case LOSE_WEIGHT -> tdee - calorieDifferencePerDay;
            case MAINTAIN_WEIGHT -> tdee;
            case GAIN_MUSCLE -> tdee + calorieDifferencePerDay;
        };

        double minCalories = (profile.getGender() == Gender.FEMALE) ? 1200.0 : 1500.0;
        if (dailyCaloriesGoal < minCalories) { dailyCaloriesGoal = minCalories; }

        double maxCalories = tdee + 500;
        if (profile.getGoal() == Goal.GAIN_MUSCLE && dailyCaloriesGoal > maxCalories) { dailyCaloriesGoal = maxCalories; }

        double heightInMeter = profile.getHeight() / 100.0;
        double bmi = profile.getWeight() / (heightInMeter * heightInMeter);

        double proteinRatio = 0.3; double carbsRatio = 0.4; double fatRatio = 0.3;
        if (profile.getGoal() == Goal.LOSE_WEIGHT) { proteinRatio = 0.4; carbsRatio = 0.3; fatRatio = 0.3; }
        else if (profile.getGoal() == Goal.GAIN_MUSCLE) { proteinRatio = 0.3; carbsRatio = 0.5; fatRatio = 0.2; }

        double proteinTarget = (dailyCaloriesGoal * proteinRatio) / 4.0;
        double carbsTarget = (dailyCaloriesGoal * carbsRatio) / 4.0;
        double fatTarget = (dailyCaloriesGoal * fatRatio) / 9.0;

        double minProtein = profile.getWeight() * 1.6;
        if (proteinTarget < minProtein) {
            proteinTarget = minProtein;
            double remainingCalories = dailyCaloriesGoal - (proteinTarget * 4);
            carbsTarget = (remainingCalories * 0.55) / 4.0;
            fatTarget   = (remainingCalories * 0.45) / 9.0;
        }

        profile.setBmr(Math.round(bmr * 10.0) / 10.0);
        profile.setTdee(Math.round(tdee * 10.0) / 10.0);
        profile.setDailyCaloriesGoal(Math.round(dailyCaloriesGoal * 10.0) / 10.0);
        profile.setBmi(Math.round(bmi * 10.0) / 10.0);
        profile.setProteinTarget((double) Math.round(proteinTarget));
        profile.setCarbsTarget((double) Math.round(carbsTarget));
        profile.setFatTarget((double) Math.round(fatTarget));
    }

}
