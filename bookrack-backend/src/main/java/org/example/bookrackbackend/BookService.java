package org.example.bookrackbackend;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    public Book addBook(BookCreationDTO bookDTO, MultipartFile image) throws IOException {
        String imageUrl = cloudinaryService.uploadImage(image);
        Book bookDTOCloud = new Book(null,bookDTO.title(), bookDTO.author(),
                bookDTO.country(), bookDTO.year(), imageUrl);
        return bookRepo.save(bookDTOCloud);
    }
}