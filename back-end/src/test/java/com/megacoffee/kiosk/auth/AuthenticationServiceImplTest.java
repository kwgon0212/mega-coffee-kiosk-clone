//package com.megacoffee.kiosk.auth;
//
//import com.megacoffee.kiosk.auth.application.port.out.LoadAuthPort;
//import com.megacoffee.kiosk.auth.application.port.out.SaveAuthPort;
//import com.megacoffee.kiosk.auth.application.service.AuthenticationServiceImpl;
//import com.megacoffee.kiosk.auth.domain.model.AuthCredential;
//import com.megacoffee.kiosk.auth.domain.model.Credentials;
//import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
//import com.megacoffee.kiosk.auth.domain.service.TokenPair;
//import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
//import com.megacoffee.kiosk.member.domain.Role;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.*;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.time.Instant;
//import java.util.Optional;
//import java.util.UUID;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.*;
//@ExtendWith(MockitoExtension.class)
//class AuthenticationServiceImplTest {
//
//    @Mock LoadAuthPort loadAuthPort;
//    @Mock SaveAuthPort saveAuthPort;
//    @Mock JwtProvider jwtProvider;
//    @Mock PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    AuthenticationServiceImpl authService;
//
//
//    @Test
//    void localLogin_success() {
//        // given
//        UUID memberId = UUID.randomUUID();
//        Credentials creds = new Credentials("user1", "rawPass", OauthProvider.LOCAL);
//        AuthCredential stored = AuthCredential.of(memberId, "user1", "hashedPass", Role.USER, provider);
//
//        // ★ 핵심: 정확한 시그니처로만 stub
//        when(loadAuthPort.findByAccountAndProvider(
//                eq("user1"), eq(OauthProvider.LOCAL)))
//                .thenReturn(Optional.of(stored));
//
//        when(passwordEncoder.matches("rawPass", "hashedPass")).thenReturn(true);
//        when(jwtProvider.generateAccessToken(memberId, "USER")).thenReturn("access-token");
//        when(jwtProvider.generateRefreshToken(memberId, "USER")).thenReturn("refresh-token");
//        when(jwtProvider.getExpiryInstant("access-token")).thenReturn(Instant.now());
//        when(jwtProvider.getExpiryInstant("refresh-token")).thenReturn(Instant.now());
//
//        // when
//        TokenPair tokens = authService.login(creds);
//
//        // then
//        assertNotNull(tokens);
//        assertEquals("access-token", tokens.getAccessToken().getToken());
//
//        // ★ 검증도 정확하게
//        verify(loadAuthPort).findByAccountAndProvider("user1", OauthProvider.LOCAL);
//    }
//
//
//        @Test
//    void localLogin_badPassword() {
//        // given
//        AuthCredential stored = AuthCredential.of(
//                UUID.randomUUID(), "user1", "hashedPass", Role.USER, provider);
//                when(loadAuthPort.findByAccountAndProvider(
//                eq("user1"), eq(OauthProvider.LOCAL)))
//                .thenReturn(Optional.of(stored));
//
//        when(passwordEncoder.matches("wrong", "hashedPass")).thenReturn(false);
//        Credentials creds = new Credentials("user1", "wrong", OauthProvider.LOCAL);
//
//        // then
//        assertThrows(
//                org.springframework.security.authentication.BadCredentialsException.class,
//             () -> authService.login(creds));
//    }
//
//    @Test
//    void socialLogin_newUser() {
//        // given
//        Credentials creds = new Credentials("social-id", null, OauthProvider.KAKAO);
//                when(loadAuthPort.findByAccountAndProvider(
//                eq("social-id"), eq(OauthProvider.KAKAO)))
//                .thenReturn(Optional.empty());
//        ArgumentCaptor<AuthCredential> captor =
//                ArgumentCaptor.forClass(AuthCredential.class);
//        when(jwtProvider.generateAccessToken(any(), eq("USER"))).thenReturn("tokA");
//        when(jwtProvider.generateRefreshToken(any(), eq("USER"))).thenReturn("tokR");
//        when(jwtProvider.getExpiryInstant(anyString()))
//                .thenReturn(java.time.Instant.now());
//
//        // when
//        TokenPair tokens = authService.login(creds);
//
//        // then
//        assertNotNull(tokens);
//        verify(saveAuthPort).save(captor.capture());
//        AuthCredential saved = captor.getValue();
//        assertEquals("social-id", saved.getAccount());
//    }
//
//}
