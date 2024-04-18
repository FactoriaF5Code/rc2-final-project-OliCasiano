package com.finalproject.backend.controllers;

import com.finalproject.backend.models.Post;
import com.finalproject.backend.repository.PostRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    private final Path rootLocation = Paths.get("upload-dir");

    public PostController(@Autowired PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @PostMapping("/api/posts")
    public ResponseEntity<String> createPost(@RequestParam("content") String content,
            @RequestParam("file") MultipartFile file) {
        try {
            
            Files.createDirectories(rootLocation);

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = rootLocation.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            Post post = new Post(null, content, filePath.toString());
            postRepository.save(post);

            return ResponseEntity.ok("Post and image saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not save image");
        }
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postRepository.findAll(); 
        if (posts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
}
