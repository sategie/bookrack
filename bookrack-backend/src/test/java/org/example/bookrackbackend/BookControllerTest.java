package org.example.bookrackbackend;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc

class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepo bookRepo;

    @MockBean
    Cloudinary cloudinary;

    Uploader uploader = mock(Uploader.class);



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


    @DirtiesContext
    @Test
    void addBook_shouldReturnSuccess_whenAllFieldsAreProvided() throws Exception {
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test"));

        MockMultipartFile image = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "Test Image Content".getBytes()
        );
        mockMvc.perform(multipart("/api/books")
                        .file(image)
                        .param("title", "Valid Title")
                        .param("author", "Valid Author")
                        .param("country", "Valid Country")
                        .param("year", "2021"))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void addBook_shouldReturnBadRequest_whenBookWithSameTitleAndAuthorExists() throws Exception {
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), any())).thenReturn(Map.of("url", "test"));
        MockMultipartFile image = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "Test Image Content".getBytes()
        );
        mockMvc.perform(multipart("/api/books")
                        .file(image)
                        .param("title", "Duplicate Title")
                        .param("author", "Duplicate Author")
                        .param("country", "Valid Country")
                        .param("year", "2021"))
                .andExpect(status().isOk());

        mockMvc.perform(multipart("/api/books")
                        .file(image)
                        .param("title", "Duplicate Title")
                        .param("author", "Duplicate Author")
                        .param("country", "Another Country")
                        .param("year", "2021"))
                .andExpect(status().isBadRequest())
                .andExpect(content().json("""
                {"message": "A book with the same title and author already exists."}
            """));
    }

    @DirtiesContext
    @Test
    void deleteBookById_shouldReturnSuccess_whenBookExists() throws Exception {
        Book book = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        bookRepo.save(book);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/1"))
                .andExpect(status().isOk());
    }

    @DirtiesContext
    @Test
    void deleteBookById_shouldThrowException_whenIdNotFound() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/2"))
                .andExpect(status().isNotFound())
                .andExpect(content().json("""
                {"message": "Sorry, the provided ID was not found."}
                """));
    }
}
