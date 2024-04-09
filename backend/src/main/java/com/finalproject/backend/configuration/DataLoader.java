package com.finalproject.backend.configuration;


import com.finalproject.backend.models.AppUser;
import com.finalproject.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public DataLoader(@Autowired UserRepository userRepository,
                      @Autowired PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void loadSampleUser() {

        userRepository.deleteAll();

        AppUser appUser = new AppUser();
        appUser.setEmail("admin@example.com");
        appUser.setPassword(passwordEncoder.encode("password"));
        appUser.setName("admin");
        appUser.setLastName("admin");

        userRepository.save(appUser);
    }

}
