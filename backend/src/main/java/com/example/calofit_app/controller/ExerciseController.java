package com.example.calofit_app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/features")
public class ExerciseController {

    @GetMapping("/history")
    public ResponseEntity<String> getHistory() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isPremiumOrPT = auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_PREMIUM"));

        if (isPremiumOrPT) {
            return ResponseEntity.ok("Trả về TOÀN BỘ lịch sử (Không giới hạn).");
        } else {
            return ResponseEntity.ok("Trả về lịch sử 14 NGÀY GẦN NHẤT (Dành cho bản Free).");
        }
    }

    @PostMapping("/meals")
    public ResponseEntity<String> logMeal() {
        return ResponseEntity.ok("Đã ghi nhận bữa ăn thành công!");
    }

    @PreAuthorize(("hasAnyRole('PREMIUM', 'PT')"))
    @GetMapping("/premium/ai-suggestions")
    public ResponseEntity<String> getAISuggestions() {
        return ResponseEntity.ok("Gợi ý AI: Bạn nên ăn thêm 200g Ức gà để đạt mục tiêu đạm.");
    }

    @PreAuthorize("hasAnyRole('PREMIUM', 'PT')")
    @GetMapping("/premium/export-pdf")
    public ResponseEntity<String> exportPdfReport() {
        return ResponseEntity.ok("Đang xuất file PDF báo cáo dinh dưỡng tháng...");
    }

    @PreAuthorize("hasAnyRole('PREMIUM', 'PT')")
    @PostMapping("/premium/barcode-scan")
    public ResponseEntity<String> scanBarcode() {
        return ResponseEntity.ok("Đã quét mã vạch thành công. Đây là sữa tươi TH True Milk.");
    }

    @PreAuthorize("hasRole('PT')")
    @PostMapping("/pt/workout-schedules")
    public ResponseEntity<String> assignWorkoutSchedule() {
        return ResponseEntity.ok("PT Đã lên lịch tập (Ngực/Triceps) cho học viên A thành công.");
    }

    @PreAuthorize("hasRole('PT')")
    @PostMapping("/pt/diet-plans")
    public ResponseEntity<String> assignDietPlan() {
        return ResponseEntity.ok("PT Đã thiết lập thực đơn (2500 kcal) cho học viên A thành công.");
    }
}
