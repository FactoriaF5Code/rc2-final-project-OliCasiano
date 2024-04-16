package com.finalproject.backend.controllers;

import com.finalproject.backend.configuration.CustomUserDetailService;
import com.finalproject.backend.configuration.LoginResponse;
import com.finalproject.backend.loginrequest.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private CustomUserDetailService customUserDetailsService;

    public AuthController(@Autowired CustomUserDetailService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {

        try {
            customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(new LoginResponse(loginRequest.getEmail(), loginRequest.getPassword()));

    }
}
