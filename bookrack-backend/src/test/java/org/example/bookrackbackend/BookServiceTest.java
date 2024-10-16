package org.example.bookrackbackend;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class BookServiceTest {
    private final BookRepo mockBookRepo = mock(BookRepo.class);
    private final BookService bookService = new BookService(mockBookRepo);


    @Test
    void getAllBooks_shouldReturnAllBooks_ifBooksExist() {
        Book book1 = new Book("1", "Things Fall Apart", "Chinua Achebe", "Nigeria", 1958,
                "images/things-fall-apart.jpg");
        List<Book> testBooks = List.of(book1);

        when(mockBookRepo.findAll()).thenReturn(testBooks);

        assertEquals(testBooks, bookService.getAllBooks());
        verify(mockBookRepo).findAll();

    }

    @Test
    void getAllBooks_shouldReturnAnEmptyList_ifNoBooksExist() {
        when(mockBookRepo.findAll()).thenReturn(List.of());

        assertTrue(bookService.getAllBooks().isEmpty());
        verify(mockBookRepo).findAll();
    }

}
