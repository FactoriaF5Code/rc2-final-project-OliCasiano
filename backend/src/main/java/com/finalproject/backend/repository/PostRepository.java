package com.finalproject.backend.repository;

import com.finalproject.backend.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Aquí puedes agregar métodos personalizados para consultas específicas si es necesario
}
