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
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class GoalService {
    private final UserProfileRepository userProfileRepository;
    private final WeightLogRepository weightLogRepository;

    public GoalProgressDTO getProgress(String email) {
        UserProfile profile = userProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Null-safe với fallback
        double current  = profile.getCurrentWeight() != null ? profile.getCurrentWeight()
                : profile.getWeight() != null ? profile.getWeight() : 0.0;
        double start    = profile.getStartWeight() != null ? profile.getStartWeight() : current;
        double target   = profile.getTargetWeight() != null ? profile.getTargetWeight() : current;
        double weekRate = profile.getWeeklyGoalRate() != null ? profile.getWeeklyGoalRate() : 0.5;

        // Progress — nếu chưa có target thì không tính được
        Double progressPercent = null;
        if (profile.getTargetWeight() != null && profile.getStartWeight() != null) {
            double totalDiff = Math.abs(start - target);
            double doneDiff  = Math.abs(start - current);
            double progress  = totalDiff == 0 ? 100.0 : (doneDiff / totalDiff) * 100.0;
            progressPercent  = Math.round(Math.min(100.0, Math.max(0.0, progress)) * 10.0) / 10.0;
        }

        // Projected date — chỉ tính khi đủ data
        LocalDate projectedDate = null;
        Integer weeksRemaining  = null;
        LocalDate projectedFast = null;
        LocalDate projectedSlow = null;

        boolean isMaintain = profile.getGoal() != null && profile.getGoal() == Goal.MAINTAIN_WEIGHT;
        double remaining   = Math.abs(current - target);

        if (profile.getTargetWeight() != null && !isMaintain && weekRate > 0 && remaining > 0.1) {
            int weeks      = (int) Math.ceil(remaining / weekRate);
            weeksRemaining = weeks;
            projectedDate  = LocalDate.now().plusWeeks(weeks);

            double fastRate = Math.min(weekRate * 2, 1.0);
            double slowRate = Math.max(weekRate / 2, 0.25);
            projectedFast = LocalDate.now().plusWeeks((long) Math.ceil(remaining / fastRate));
            projectedSlow = LocalDate.now().plusWeeks((long) Math.ceil(remaining / slowRate));
        }

        // Weekly actual change
        Double weeklyActual = weightLogRepository
                .findWeeklyChange(profile.getUser().getId(), LocalDate.now().minusDays(7))
                .orElse(null);

        // BMI — chỉ tính khi đủ data
        Double bmi = null;
        String bmiCategory = null;
        if (profile.getHeight() != null && profile.getHeight() > 0
                && profile.getWeight() != null && profile.getWeight() > 0) {
            double heightM = profile.getHeight() / 100.0;
            double bmiVal  = profile.getWeight() / (heightM * heightM);
            bmi            = Math.round(bmiVal * 10.0) / 10.0;
            bmiCategory    = getBmiCategory(bmiVal);
        }

        log.info("progress of user {} created", email);
        return GoalProgressDTO.builder()
                .startWeight(profile.getStartWeight())   // trả null nếu chưa có
                .currentWeight(current > 0 ? current : null)
                .targetWeight(profile.getTargetWeight()) // trả null nếu chưa có
                .progressPercent(progressPercent)        // null nếu thiếu data
                .weeklyActual(weeklyActual)
                .weeklyTarget(weekRate)
                .projectedDate(projectedDate)
                .weeksRemaining(weeksRemaining)
                .projectedFast(projectedFast)
                .projectedSlow(projectedSlow)
                .goalType(profile.getGoal() != null ? profile.getGoal().name() : null)
                .bmi(bmi)
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
