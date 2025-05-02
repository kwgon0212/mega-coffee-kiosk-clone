package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.dto.SignupCommand;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
@Transactional
@Service
@RequiredArgsConstructor
public class SignupMemberService implements SignupMember {
    private final AuthenticationService authenticationService;
    @Override
    public UUID exec(SignupCommand cmd) {
        Credentials creds = new Credentials(
                cmd.getAccount(),
                cmd.getPassword(),
                OauthProvider.LOCAL
        );
        return authenticationService.signUp(creds);
    }

}
