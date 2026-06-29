package com.example.calofit_app.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalProgressDTO {
    private Double startWeight;
    private Double currentWeight;
    private Double targetWeight;

    private Double progressPercent;
    private Double weeklyActual;
    private Double weeklyTarget;

    private LocalDate projectedDate;
    private Integer weeksRemaining;

    private String goalType;
    private String bmiCategory;
    private Double bmi;

    private LocalDate projectedFast;
    private LocalDate projectedSlow;
}
