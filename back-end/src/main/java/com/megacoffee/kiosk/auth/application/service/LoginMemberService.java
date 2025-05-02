package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.dto.LoginCommand;
import com.megacoffee.kiosk.auth.application.port.in.LoginMember;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.service.AuthenticationService;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginMemberService implements LoginMember {
    private final AuthenticationService authenticationService;

    @Override
    public TokenPair exec(LoginCommand cmd) {
        Credentials creds = new Credentials(
                cmd.getAccount(),
                cmd.getPassword(),
                OauthProvider.LOCAL
        );
        return authenticationService.login(creds);
    }
}