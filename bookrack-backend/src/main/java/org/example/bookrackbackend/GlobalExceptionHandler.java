package org.example.bookrackbackend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseStatus(HttpStatus.NOT_FOUND)

public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)

    public ErrorMessage handleGlobalException() {
        return new ErrorMessage("Please provide a valid ID.");
    }
}
