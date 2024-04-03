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

import com.finalproject.backend.models.AppUser;
import com.finalproject.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/register")
    public ResponseEntity<String> registerUser(@RequestBody AppUser user) {
        userRepository.save(user);
        return new ResponseEntity<>("User register Successfully", HttpStatus.CREATED);
    }
    
    @GetMapping("/api/users")
    public ResponseEntity<List<AppUser>> getUsers() {
        List<AppUser> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
