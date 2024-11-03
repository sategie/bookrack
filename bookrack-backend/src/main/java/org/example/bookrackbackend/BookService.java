package org.example.bookrackbackend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepo bookRepo;

    private final CloudinaryService cloudinaryService;

    public BookService(BookRepo bookRepo, CloudinaryService cloudinaryService) {
        this.bookRepo = bookRepo;
        this.cloudinaryService = cloudinaryService;
    }

    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    public Book getBookById(String id) {
        return bookRepo.findById(id).orElseThrow();
    }

    public Book addBook(Book book) {
        return bookRepo.save(book);
    }
}
