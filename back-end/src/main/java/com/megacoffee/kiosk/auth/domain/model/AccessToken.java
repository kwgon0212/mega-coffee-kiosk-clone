package com.megacoffee.kiosk.auth.domain.model;

import lombok.Getter;
import java.time.Instant;

@Getter
public class AccessToken {
    private final String token;
    private final Instant expiresAt;

    public AccessToken(String token, Instant expiresAt) {
        this.token = token;
        this.expiresAt = expiresAt;
    }
}