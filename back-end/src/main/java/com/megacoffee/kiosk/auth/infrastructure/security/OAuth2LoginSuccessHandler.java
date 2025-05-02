package com.megacoffee.kiosk.auth.infrastructure.security;

import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    public OAuth2LoginSuccessHandler(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {
        DefaultOAuth2User user = (DefaultOAuth2User) authentication.getPrincipal();
        String token   = (String) user.getAttribute("token");
        String refresh = (String) user.getAttribute("refresh");

        // 헤더에 담거나, 리디렉션 URL에 쿼리 파라미터로 전달
        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);
        response.setHeader("X-Refresh-Token", refresh);
        response.sendRedirect("/");
    }

}