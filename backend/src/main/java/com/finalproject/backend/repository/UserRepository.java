package com.finalproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finalproject.backend.models.AppUser;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<AppUser, Long>{
    AppUser findByEmail(String email); 
}