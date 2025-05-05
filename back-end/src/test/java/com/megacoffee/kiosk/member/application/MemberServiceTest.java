package com.megacoffee.kiosk.member.application;

import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.application.port.out.LoadPort;
import com.megacoffee.kiosk.auth.application.service.LoginService;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.member.domain.Role;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.naming.AuthenticationException;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class) // ✅ SpringBootTest 제거
class MemberServiceTest {

    @Nested
    class LoginServiceTest {

        @Mock
        private LoadPort loadPort;

        @Mock
        private PasswordEncoder passwordEncoder;

        @InjectMocks
        private LoginService loginService;

        @Test
        void 로그인성공_테스트() throws Exception {
            // given
            String account = "testUser";
            String rawPassword = "password123";
            String hashedPassword = "$2a$10$abc123hashedpassword"; // bcrypt 해시 예시
            UUID memberId = UUID.randomUUID();

            AuthCredentials authCredentials = AuthCredentials.of(
                    memberId,
                    rawPassword,
                    hashedPassword,
                    Role.USER
            );

            when(loadPort.getByAccount(account)).thenReturn(authCredentials);
            when(passwordEncoder.matches(rawPassword, hashedPassword)).thenReturn(true);

//            // when
//            UUID result = loginService.login(credentials);
//
//            // then
//            assertEquals(memberId, result);
        }

        @Test
        void 로그인실패_비밀번호불일치() {
            // given
            String account = "testUser";
            String rawPassword = "wrongPassword";
            String hashedPassword = "$2a$10$abc123hashedpassword";
            UUID memberId = UUID.randomUUID();

            AuthCredentials authCredentials = AuthCredentials.of(
                    memberId,
                    "originalPassword",
                    hashedPassword,
                    Role.USER
            );

            Credentials credentials = new Credentials(account, rawPassword);

            when(loadPort.getByAccount(account)).thenReturn(authCredentials);
            when(passwordEncoder.matches(rawPassword, hashedPassword)).thenReturn(false);

            // when & then
            assertThrows(AuthenticationException.class, () -> {
//                loginService.login(credentials);
            });
        }
    }
}
