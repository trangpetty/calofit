package com.example.calofit_app.dto;

import com.example.calofit_app.entity.enums.ActivityLevel;
import com.example.calofit_app.entity.enums.Gender;
import com.example.calofit_app.entity.enums.Goal;
import lombok.Data;

@Data
public class UserProfileRequest {
    private Integer age;
    private Gender gender;
    private Double weight;
    private Double height;
    private ActivityLevel activityLevel;
    private Goal goal;
}
