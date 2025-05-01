package com.megacoffee.kiosk.global.response;


public record SuccessResponse<T>(boolean success, int status, String message, T data) {
    public static <T> SuccessResponse<T> success(String message, T data) {
        return new SuccessResponse<>(true,200, message, data);
    }
}