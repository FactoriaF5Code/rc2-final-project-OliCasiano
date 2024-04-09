package com.finalproject.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.finalproject.backend.loginrequest.LoginRequest;
import com.finalproject.backend.models.AppUser;
import com.finalproject.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/register")
    public ResponseEntity<String> registerUser(@RequestBody AppUser user) {

        AppUser existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("El correo ya esta en uso");
        }

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        List<AppUser> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {

            AppUser user;

            user = userRepository.findByEmail(loginRequest.getEmail());
            
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

            Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails,
                    loginRequest.getPassword(), userDetails.getAuthorities());

            authenticationManager.authenticate(authentication);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok("Usuario autenticado");
        } catch (BadCredentialsException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
