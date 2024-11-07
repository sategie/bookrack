package org.example.bookrackbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc

class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepo bookRepo;

    @DirtiesContext
    @Test
    void getAllBooks() throws Exception {
        Book book = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        bookRepo.save(book);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books")).andExpect(status().isOk())
                .andExpect(content().json(
                        """
 [
                        {
                                "id": "1",
                                "title": "Things Fall Apart",
                                "author": "Chinua Achebe",
                                "country": "Nigeria",
                                "year": 1958,
                                "imageLink": "images/things-fall-apart.jpg"
}]
"""

                ));
    }

    @DirtiesContext
    @Test
    void getBookById() throws Exception {
        Book book = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        bookRepo.save(book);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1")).andExpect(status().isOk())
                .andExpect(content().json(
                        """
 
                        {
                                "id": "1",
                                "title": "Things Fall Apart",
                                "author": "Chinua Achebe",
                                "country": "Nigeria",
                                "year": 1958,
                                "imageLink": "images/things-fall-apart.jpg"
}
"""

                ));


    }

    @Test
    void getBookById_shouldThrowException_whenIdNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/2")).andExpect(status().isNotFound())
                .andExpect(content().json("""
                {"message": "Sorry, the provided ID was not found."}
                """));

    }

    @Test
    void getBookById_shouldThrowException_whenInvalidIdProvided() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/#")).andExpect(status().isNotFound())
                .andExpect(content().json("""
                {"message": "Please check entered URL."}
                """));

    }
}