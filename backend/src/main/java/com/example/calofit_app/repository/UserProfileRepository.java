package com.example.calofit_app.repository;

import com.example.calofit_app.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
    Optional<UserProfile> findByUserEmail(String email);

    Optional<UserProfile> findByUserId(Long userId);
}
