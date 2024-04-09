package com.finalproject.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
public class PublicationController {

    @GetMapping
    public String getAllPosts() {
        return "hello!";
    }
}
