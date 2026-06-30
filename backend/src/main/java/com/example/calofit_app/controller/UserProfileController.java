package com.example.calofit_app.controller;


import com.example.calofit_app.dto.UserProfileRequest;
import com.example.calofit_app.entity.UserProfile;
import com.example.calofit_app.service.UserProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Controller
@RequestMapping("/profiles")
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @PostMapping
    public ResponseEntity<UserProfile> saveProfilesaveProfile(@RequestBody UserProfileRequest request, Authentication authentication) {
        String email = authentication.getName();
        UserProfile savedProfile = userProfileService.createUserProfile(email, request);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            UserProfile profile = userProfileService.getProfileByEmail(email);
            log.info("Profile found with email {}: {}", email, profile.toString());
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<UserProfile> updateProfilePartial(@RequestBody UserProfileRequest request, Authentication authentication) {
        String email = authentication.getName();
        UserProfile updatedProfile = userProfileService.updatePartialProfile(email, request);
        return ResponseEntity.ok(updatedProfile);
    }
}
