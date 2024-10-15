package org.example.bookrackbackend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {
    private final BookRepo bookRepo;

    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }
}
