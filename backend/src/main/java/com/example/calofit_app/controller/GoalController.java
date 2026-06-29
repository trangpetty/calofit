package com.example.calofit_app.controller;

import com.example.calofit_app.dto.GoalProgressDTO;
import com.example.calofit_app.dto.WeightLogRequest;
import com.example.calofit_app.service.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @GetMapping("/progress")
    public ResponseEntity<GoalProgressDTO> getProgress (@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(goalService.getProgress(userDetails.getUsername()));

    }

    @PostMapping("/weight-log")
    public ResponseEntity<GoalProgressDTO> logWeight (@AuthenticationPrincipal UserDetails userDetails,
                                                      @RequestBody WeightLogRequest weightLogRequest) {
        LocalDate date = weightLogRequest.getLoggedDate() != null
                        ? weightLogRequest.getLoggedDate() : LocalDate.now();
        return ResponseEntity.ok(
                goalService.logWeight(userDetails.getUsername(), weightLogRequest.getWeight(), date)
        );
    }
}
