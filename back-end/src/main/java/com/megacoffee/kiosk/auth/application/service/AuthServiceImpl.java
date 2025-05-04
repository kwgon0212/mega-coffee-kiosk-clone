package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.application.port.in.*;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;
import com.megacoffee.kiosk.auth.domain.service.AuthService;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final LoginMember loginMember;
    private final SignupMember signupMember;
    private final LogoutMember logoutMember;
    private final DeleteMember deleteMember;
    private final GoogleLogin googleLogin;
    private final GoogleRedirect googleRedirect;
    private final KakaoLogin kakaoLogin;
    private final KakaoRedirect kakaoRedirect;

    @Override
    public Member login(RequestLogin requestLogin) throws AuthenticationException {
        return loginMember.login(requestLogin);
    }

    @Override
    public boolean deletedMember(UUID memberId) {
        return deleteMember.delete(memberId);
    }

    @Override
    public void logout(UUID memberId) {
        logoutMember.logout(memberId);
    }

    @Override
    public UUID signUp(RegisterRequest registerRequest) {
        return signupMember.signup(registerRequest);
    }

    @Override
    public ResponseLogin googleLogin(OAuthLoginDto oAuthLoginDto) {
        return googleLogin.login(oAuthLoginDto);
    }

    @Override
    public String googleRedirect() {
        return googleRedirect.redirect();
    }

    @Override
    public ResponseLogin kakaoLogin(OAuthLoginDto oAuthLoginDto) {
        return kakaoLogin.login(oAuthLoginDto);
    }

    @Override
    public String kakaoRedirect() {
        return kakaoRedirect.redirect();
    }
}
