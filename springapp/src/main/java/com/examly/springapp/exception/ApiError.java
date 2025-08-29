// src/main/java/com/examly/springapp/exception/ApiError.java
package com.examly.springapp.exception;

public class ApiError {
    private final String message;

    public ApiError(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
