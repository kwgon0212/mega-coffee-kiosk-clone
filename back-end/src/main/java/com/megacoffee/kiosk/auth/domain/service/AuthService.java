package com.megacoffee.kiosk.auth.domain.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;
import com.megacoffee.kiosk.member.domain.Member;

import javax.naming.AuthenticationException;
import java.security.cert.Certificate;
import java.util.UUID;

public interface AuthService {
    Member login(RequestLogin requestLogin) throws AuthenticationException;
    boolean deletedMember(UUID memberId);
    void logout(UUID memberId);
    UUID signUp(RegisterRequest registerRequest); // Controller에서 필요한 정보만 넘기기 나머지는 Member로 넘기기

    ResponseLogin googleLogin(OAuthLoginDto oAuthLoginDto);
    String googleRedirect();

    ResponseLogin kakaoLogin(OAuthLoginDto oAuthLoginDto);
    String kakaoRedirect();
}
