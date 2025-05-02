package com.megacoffee.kiosk.auth.domain.service;

import com.megacoffee.kiosk.auth.domain.model.AccessToken;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.RefreshToken;

import java.util.UUID;

public interface AuthenticationService {
    UUID signUp(Credentials creds);
    TokenPair login(Credentials creds);
    AccessToken refresh(RefreshToken refreshToken);
    void logout(AccessToken accessToken);
    void deleteMember(UUID memberId);

}
