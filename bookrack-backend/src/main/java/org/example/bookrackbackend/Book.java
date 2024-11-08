package org.example.bookrackbackend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("book")
public record Book(@Id String id, String title, String author, String country, int year, String imageLink) {
}



