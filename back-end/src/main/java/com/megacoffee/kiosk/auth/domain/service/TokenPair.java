package com.megacoffee.kiosk.auth.domain.service;

import com.megacoffee.kiosk.auth.domain.model.AccessToken;
import com.megacoffee.kiosk.auth.domain.model.RefreshToken;
import lombok.Getter;

@Getter
public class TokenPair {
    private final AccessToken accessToken;
    private final RefreshToken refreshToken;

    public TokenPair(AccessToken accessToken, RefreshToken refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
