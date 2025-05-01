package com.megacoffee.kiosk.global.handler;

import com.megacoffee.kiosk.global.response.ErrorResponse;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponse> handleIllegalState(IllegalStateException e) {
        ErrorResponse errorResponse = ErrorResponse.of(400, e.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }
}
