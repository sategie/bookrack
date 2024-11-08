package org.example.bookrackbackend;

import org.springframework.web.multipart.MultipartFile;

public record BookCreationDTO(String title, String author, String country, String year, MultipartFile image ) {
}
