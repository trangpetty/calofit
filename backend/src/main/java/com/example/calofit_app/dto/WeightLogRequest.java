package com.example.calofit_app.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;

@Data
public class WeightLogRequest {
    @NotNull
    private Double weight;

    private LocalDate loggedDate;
    private String note;
}
