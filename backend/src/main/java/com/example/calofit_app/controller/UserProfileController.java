package com.example.calofit_app.controller;


import com.example.calofit_app.dto.UserProfileRequest;
import com.example.calofit_app.entity.UserProfile;
import com.example.calofit_app.service.UserProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/profiles")
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
}
