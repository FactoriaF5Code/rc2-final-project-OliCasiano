package com.finalproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.finalproject.backend.models.Post;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
}
