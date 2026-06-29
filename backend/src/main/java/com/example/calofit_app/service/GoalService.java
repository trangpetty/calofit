package com.example.calofit_app.service;

import com.example.calofit_app.dto.GoalProgressDTO;
import com.example.calofit_app.entity.User;
import com.example.calofit_app.entity.UserProfile;
import com.example.calofit_app.entity.WeightLog;
import com.example.calofit_app.entity.enums.Goal;
import com.example.calofit_app.repository.UserProfileRepository;
import com.example.calofit_app.repository.WeightLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoalService {
    private final UserProfileRepository userProfileRepository;
    private final WeightLogRepository weightLogRepository;

    public GoalProgressDTO getProgress (String email) {
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        double current  = profile.getCurrentWeight() != null
                ? profile.getCurrentWeight()
                : profile.getStartWeight();
        double target   = profile.getTargetWeight();
        double start    = profile.getStartWeight();
        double weekRate = profile.getWeeklyGoalRate() != null
                ? profile.getWeeklyGoalRate() : 0.5;

        // Progress %
        double totalDiff = Math.abs(start - target);
        double doneDiff  = Math.abs(start - current);
        double progress  = totalDiff == 0 ? 100.0 : (doneDiff / totalDiff) * 100.0;
        progress = Math.min(100.0, Math.max(0.0, progress));

        // Projected date
        LocalDate projectedDate = null;
        int weeksRemaining = 0;
        double remaining = Math.abs(current - target);

        boolean isMaintain = profile.getGoal() == Goal.MAINTAIN_WEIGHT;

        if (!isMaintain && weekRate > 0 && remaining > 0.1) {
            weeksRemaining = (int) Math.ceil(remaining / weekRate);
            projectedDate  = LocalDate.now().plusWeeks(weeksRemaining);
        }

        // Projected fast/slow scenarios (Premium feature)
        LocalDate projectedFast = null;
        LocalDate projectedSlow = null;
        if (!isMaintain && remaining > 0.1) {
            double fastRate = Math.min(weekRate * 2, 1.0); // cap 1kg/tuần
            double slowRate = Math.max(weekRate / 2, 0.25);
            projectedFast = LocalDate.now().plusWeeks((long) Math.ceil(remaining / fastRate));
            projectedSlow = LocalDate.now().plusWeeks((long) Math.ceil(remaining / slowRate));
        }

        // Weekly actual change
        Double weeklyActual = weightLogRepository
                .findWeeklyChange(profile.getUser().getId(), LocalDate.now().minusDays(7))
                .orElse(null);

        // BMI category
        double heightM = profile.getHeight() / 100.0;
        double bmi = profile.getWeight() / (heightM * heightM);
        String bmiCategory = getBmiCategory(bmi);

        log.info("progress of user {} created", email);
        return GoalProgressDTO.builder()
                .startWeight(start)
                .currentWeight(current)
                .targetWeight(target)
                .progressPercent(Math.round(progress * 10.0) / 10.0)
                .weeklyActual(weeklyActual)
                .weeklyTarget(weekRate)
                .projectedDate(projectedDate)
                .weeksRemaining(weeksRemaining > 0 ? weeksRemaining : null)
                .projectedFast(projectedFast)
                .projectedSlow(projectedSlow)
                .goalType(profile.getGoal().name())
                .bmi(Math.round(bmi * 10.0) / 10.0)
                .bmiCategory(bmiCategory)
                .build();
    }

    public GoalProgressDTO logWeight (String email, Double weight, LocalDate date) {
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        profile.setCurrentWeight(weight);
        userProfileRepository.save(profile);

        User user = profile.getUser();
        WeightLog weightLog = weightLogRepository
                .findByUserIdAndLoggedDate(user.getId(), date)
                .orElse(WeightLog.builder().user(user).build());

        weightLog.setWeight(weight);
        weightLog.setLoggedDate(date);
        weightLogRepository.save(weightLog);

        log.info("logWeight user {} created: {}", email, weightLog);
        return getProgress(email);
    }

    private String getBmiCategory(double bmi) {
        if (bmi < 18.5) return "Thiếu cân";
        if (bmi < 25.0) return "Bình thường";
        if (bmi < 30.0) return "Thừa cân";
        return "Béo phì";
    }
}
