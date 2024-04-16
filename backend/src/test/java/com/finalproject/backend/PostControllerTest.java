package com.finalproject.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalproject.backend.models.Post;
import com.finalproject.backend.repository.PostRepository;

@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PostRepository postRepository;

    @BeforeEach
    public void setUp() {
        // Aquí puedes inicializar cualquier configuración necesaria para tus pruebas
    }

    @Test
    public void testCreatePost() throws Exception {
        // Datos de prueba
        String postContent = "Contenido del post de prueba";
        Post post = new Post();
        post.setContent(postContent);
    
        // Simular la solicitud HTTP POST y verificar el estado de la respuesta
        mockMvc.perform(MockMvcRequestBuilders.post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(post)))
                .andExpect(status().isCreated());
    
        // Verificar si el post se guardó correctamente en el repositorio
        Post savedPost = postRepository.findAll().get(0);
        assertEquals(postContent, savedPost.getContent());
    }
    

// Método para convertir un objeto a JSON
private String asJsonString(final Object obj) {
    try {
        return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}

}

