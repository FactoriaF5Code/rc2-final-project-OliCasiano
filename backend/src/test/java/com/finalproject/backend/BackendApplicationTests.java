package com.finalproject.backend;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.ArgumentMatchers.any; 
import static org.mockito.Mockito.when;



import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.finalproject.backend.models.AppUser;
import com.finalproject.backend.repository.UserRepository;

@SpringBootTest
@AutoConfigureMockMvc
class RegisterUserTest {

    @Autowired
    private MockMvc api;

    @Autowired
    private UserRepository repository;

    @BeforeEach
    void setup() {
        repository.deleteAll();
    }

    @Test
    @DisplayName("Crear usuario en base de datos")
    void registerNewUser() throws Exception {

        // Simula una respuesta al guardar un usuario
        AppUser savedUser = new AppUser(); 
        savedUser.setId(1L); // Asignar un id
        savedUser.setName("Javi");
        savedUser.setLastName("Sánchez");
        savedUser.setEmail("javi@example.com");
        savedUser.setPassword("password");

        when(repository.save(any(AppUser.class))).thenReturn(savedUser);

        api.perform(post("/api/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                        {
                            "name": "Javi",
                            "lastName": "Sánchez",
                            "email": "javi@example.com",
                            "password": "password"
                        }   
                    """))
                .andExpect(status().is(201));

        List<AppUser> users = repository.findAll();

        assertThat(users, hasSize(1));
        AppUser user = users.get(0);
        assertThat(user.getName(), equalTo("Javi"));
        assertThat(user.getLastName(), equalTo("Sánchez"));
        assertThat(user.getEmail(), equalTo("javi@example.com"));
        assertThat(user.getPassword(), equalTo("password"));
        

    }

}
