package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.dto.LoginCommand;
import com.megacoffee.kiosk.auth.application.port.in.LoginMember;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final LoginMember loginMember;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        // 원본 OAuth2User 조회
        OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(request);
        String regId = request.getClientRegistration().getRegistrationId(); // "google" or "kakao"
        OauthProvider provider = OauthProvider.valueOf(regId.toUpperCase());

        // 프로바이더별 사용자 식별자 추출
        String oauthId;
        if (provider == OauthProvider.GOOGLE) {
            oauthId = oauth2User.getAttribute("sub");
        } else {
            oauthId = String.valueOf(Objects.requireNonNull(oauth2User.getAttribute("id")));
        }

        // Credentials 생성
        Credentials creds = new Credentials(
                oauthId,
                null,
                provider
        );

        // Credentials → LoginCommand 매핑
        LoginCommand cmd = new LoginCommand(
                creds.getAccount(),
                creds.getSecret(),    // social 로그인의 경우 null이어도 무방
                creds.getProvider()
        );

        // AuthenticationService.login() 호출
        TokenPair tokens = loginMember.exec(cmd);

        // Principal 에 토큰을 담아 반환
        Map<String, Object> attrs = Map.of(
                "accessToken",  tokens.getAccessToken().getToken(),
                "refreshToken", tokens.getRefreshToken().getToken()
        );
        return new DefaultOAuth2User(
                List.of(new SimpleGrantedAuthority("ROLE_USER")),
                attrs,
                "accessToken"
        );
    }
}
