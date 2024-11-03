package org.example.bookrackbackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private CloudinaryService cloudinaryService;

    public BookController(BookService bookService, CloudinaryService cloudinaryService) {
        this.bookService = bookService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping()
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id){
        return bookService.getBookById(id);
    }

    @PostMapping()
    public Book addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }









    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public ErrorMessage handleNoSuchElementException() {
        return new ErrorMessage("Sorry, the provided ID was not found.");
    }



}
