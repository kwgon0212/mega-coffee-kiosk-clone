package com.megacoffee.kiosk.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.megacoffee.kiosk.auth.application.dto.LoginCommand;
import com.megacoffee.kiosk.auth.application.port.in.LoginMember;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;
import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.OAuth2LoginRequestPostProcessor;
import org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import java.util.List;
import java.util.Map;
import java.util.UUID;


@SpringBootTest
public class AuthIntegrationTest {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private SignupMember signupMember;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    @TestConfiguration
    static class OAuth2MockConfig {

        // 1) LoginMember + JwtProvider 를 이용해서
        //    실제 로그인 로직 → 토큰 페어 생성 흐름을 탈 수 있게 해 줍니다.
        @Bean
        @Primary
        public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService(
                LoginMember loginMember,
                JwtProvider jwtProvider
        ) {
            return userRequest -> {
                // 원본 유저 정보(sub, email 등) 조회
                OAuth2User delegate = new DefaultOAuth2UserService().loadUser(userRequest);

                // 로그인 비즈니스 호출 → JWT 페어 발급
                TokenPair pair = loginMember.exec(new LoginCommand(
                        delegate.getAttribute("sub"),
                        null,
                        OauthProvider.valueOf(userRequest
                                .getClientRegistration()
                                .getRegistrationId()
                                .toUpperCase())
                ));

                // SuccessHandler 가 꺼내갈 속성명(token, refresh)에 맞춰 세팅
                Map<String, Object> attrs = Map.of(
                        "sub",     delegate.getAttribute("sub"),
                        "email",   delegate.getAttribute("email"),
                        "token",   pair.getAccessToken().getToken(),
                        "refresh", pair.getRefreshToken().getToken()
                );

                return new DefaultOAuth2User(
                        List.of(new SimpleGrantedAuthority("ROLE_USER")),
                        attrs,
                        "token"
                );
            };
        }

        // 2) InMemory 로 “google” ClientRegistration 을 미리 등록해 줍니다.
        @Bean
        public ClientRegistrationRepository clientRegistrationRepository() {
            ClientRegistration google = ClientRegistration.withRegistrationId("google")
                    .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                    .clientId("dummy")
                    .clientSecret("dummy")
                    .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                    .scope("openid", "profile", "email")
                    .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                    .tokenUri("https://www.googleapis.com/oauth2/v4/token")
                    .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                    .userNameAttributeName("sub")
                    .build();
            return new InMemoryClientRegistrationRepository(google);
        }
    }

    private void setupMockMvc() {
        if (mockMvc == null) {
            mockMvc = MockMvcBuilders
                    .webAppContextSetup(context)
                    .apply(SecurityMockMvcConfigurers.springSecurity())
                    .build();
        }
    }

    @Test
    void socialLogin_google_accessProtected() throws Exception {
        setupMockMvc();

        // --- 0) 소셜 OAuth 콜백 전에 미리 회원가입 (member 테이블에 프로필 생성) ---
        // social-id 로 쓸 "mock-oauth-id" 를 account 로 넣고, 나머지 필드는 더미로
        Map<String, Object> regReq = Map.of(
                "name", "테스트유저",
                "account", "mock-oauth-id",
                "password", "ignored",           // 실제 소셜 로그인에선 사용하지 않으므로 아무 값
                "phonenumber", "010-0000-0000",
                "nickName", "테스트닉네임"
                // 만약 gender, birth 필드를 추가했다면 여기도 넣어 주세요.
        );
        mockMvc.perform(post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(regReq)))
                .andExpect(status().isCreated());

        // --- 1) ClientRegistration 준비 (registrationId="google") ---
        ClientRegistration google = ClientRegistration.withRegistrationId("google")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .clientId("dummy")
                .clientSecret("dummy")
                .redirectUri("{baseUrl}/login/oauth2/code/{registrationId}")
                .scope("openid", "profile", "email")
                .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                .tokenUri("https://www.googleapis.com/oauth2/v4/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName("sub")
                .build();

        // --- 2) OAuth2 인증 정보 심기 ---
        OAuth2LoginRequestPostProcessor oauth2 = oauth2Login()
                .clientRegistration(google)
                .attributes(attrs -> {
                    attrs.put("sub", "mock-oauth-id");
                    attrs.put("email", "test@mock.com");
                });

        // --- 3) 보호된 엔드포인트 호출해서 200 OK 확인 ---
        mockMvc.perform(get("/api/members/{id}", /* = */ UUID.nameUUIDFromBytes("mock-oauth-id".getBytes()))
                        .with(oauth2))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(
                        UUID.nameUUIDFromBytes("mock-oauth-id".getBytes()).toString()
                ));
    }
}

