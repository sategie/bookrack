package org.example.bookrackbackend;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static java.lang.Integer.parseInt;

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


    public Book addBook(BookCreationDTO bookDTO) throws IOException {

        List<Book> allBooks = getAllBooks();
        for (Book book : allBooks) {
            if (book.title().equalsIgnoreCase(bookDTO.title()) &&
                    book.author().equalsIgnoreCase(bookDTO.author())) {
                throw new IllegalArgumentException("A book with the same title and author already exists.");
            }
        }

        String imageUrl;

        if (bookDTO.image().isEmpty()) {
            imageUrl = "https://res.cloudinary.com/dvfxz4as6/image/upload/v1730376417/books/" +
                    "default_book_image_ydprpr.webp";
        } else {
            imageUrl = cloudinaryService.uploadImage(bookDTO.image());
        }
        Book bookDTOCloud = new Book(null,bookDTO.title(), bookDTO.author(),
                bookDTO.country(), parseInt(bookDTO.year()), imageUrl);
        return bookRepo.save(bookDTOCloud);
    }
}