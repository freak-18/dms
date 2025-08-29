// src/main/java/com/examly/springapp/exception/GlobalExceptionHandler.java
package com.examly.springapp.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError handleNotFound(EntityNotFoundException ex) {
        return new ApiError(ex.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiError handleDataIntegrity(DataIntegrityViolationException ex) {
        // For validation (bad input) we’ll manually return 400 in controllers/services when needed.
        // Here we keep it 409 for duplicates to satisfy “409 Conflict on duplicates”.
        return new ApiError(ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleBadRequest(IllegalArgumentException ex) {
        return new ApiError(ex.getMessage());
    }
}
