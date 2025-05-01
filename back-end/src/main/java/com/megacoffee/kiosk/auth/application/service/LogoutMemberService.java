package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.port.in.LogoutMember;
import com.megacoffee.kiosk.auth.domain.model.AccessToken;
import com.megacoffee.kiosk.auth.domain.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutMemberService implements LogoutMember {
    private final AuthenticationService authenticationService;

    @Override
    public void exec(AccessToken accessToken) {
        authenticationService.logout(accessToken);
    }
}