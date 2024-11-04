package org.example.bookrackbackend;

import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BookServiceTest {
    private final BookRepo mockBookRepo = mock(BookRepo.class);
    private final CloudinaryService mockCloudinaryService = mock(CloudinaryService.class);
    private final BookService bookService = new BookService(mockBookRepo, mockCloudinaryService);


    @Test
    void getAllBooks_shouldReturnAllBooks_ifBooksExist() {
        Book book1 = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        List<Book> testBooks = List.of(book1);

        when(mockBookRepo.findAll())
                .thenReturn(testBooks);

        assertEquals(testBooks, bookService.getAllBooks());
        verify(mockBookRepo).findAll();

    }

    @Test
    void getAllBooks_shouldReturnAnEmptyList_ifNoBooksExist() {
        when(mockBookRepo.findAll()).thenReturn(List.of());

        assertTrue(bookService.getAllBooks().isEmpty());
        verify(mockBookRepo).findAll();
    }

    @Test
    void getBookById_shouldReturnSpecificBook_ifBookExists() {
        Book book1 = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        when(mockBookRepo.findById("1"))
                .thenReturn(Optional.of(book1));

        assertEquals(book1, bookService.getBookById("1"));
        verify(mockBookRepo).findById("1");
    }

    @Test
    void getBookById_shouldThrowException_ifBookDoesNotExist() {
        when(mockBookRepo.findById("1")).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> bookService.getBookById("1"));
        verify(mockBookRepo).findById("1");
    }

    @Test
    void addBook_shouldAddBookToDatabase() throws IOException {
        Book book = new Book("1", "Things Fall Apart", "Chinua Achebe",
                "Nigeria", 1958, "");

        MultipartFile image = mock(MultipartFile.class);

        String imageUrl = "http://example.com/image.jpg";
        when(mockCloudinaryService.uploadImage(image)).thenReturn(imageUrl);

        Book bookWithImage = new Book(book.id(), book.title(), book.author(), book.country(), book.year(), imageUrl);
        when(mockBookRepo.save(bookWithImage)).thenReturn(bookWithImage);

        Book savedBook = bookService.addBook(book, image);

        assertEquals(bookWithImage, savedBook);

        verify(mockBookRepo).save(bookWithImage);
        verify(mockCloudinaryService).uploadImage(image);







    }


}
