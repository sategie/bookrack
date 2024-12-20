package org.example.bookrackbackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
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
    public Book addBook(@RequestParam("file") MultipartFile image,@RequestParam("title") String title,
                        @RequestParam("author") String author,
                          @RequestParam("country") String country, @RequestParam("year")
                            String year) throws IOException {
        BookCreationDTO bookDTO = new BookCreationDTO(title, author, country, year, image);
        return bookService.addBook(bookDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteBookById(@PathVariable String id) {
        bookService.deleteBookById(id);
    }



    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    public ErrorMessage handleNoSuchElementException() {
        return new ErrorMessage("Sorry, the provided ID was not found.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorMessage handleIllegalArgumentException(IllegalArgumentException e) {
        return new ErrorMessage(e.getMessage());
    }

}


