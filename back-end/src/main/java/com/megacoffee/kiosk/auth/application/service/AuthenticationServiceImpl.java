package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.application.port.out.DeleteAuthPort;
import com.megacoffee.kiosk.auth.application.port.out.LoadAuthPort;
import com.megacoffee.kiosk.auth.application.port.out.SaveAuthPort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredential;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.model.AccessToken;
import com.megacoffee.kiosk.auth.domain.model.RefreshToken;
import com.megacoffee.kiosk.auth.domain.service.AuthenticationService;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;
import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final SaveAuthPort saveAuthPort;
    private final LoadAuthPort loadAuthPort;
    private final DeleteAuthPort deleteAuthPort;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UUID signUp(Credentials creds) {
        UUID newId = UUID.randomUUID();
        String hashed = passwordEncoder.encode(creds.getSecret());
        AuthCredential ac = AuthCredential.of(
                newId,
                creds.getAccount(),
                hashed,
                Role.USER,
                creds.getProvider());
        saveAuthPort.save(ac);
        return newId;
    }

    @Override
    public TokenPair login(Credentials creds) {
        UUID memberId;
        Role role;

        if (creds.getProvider() == OauthProvider.LOCAL) {
            AuthCredential db = loadAuthPort.findByAccountAndProvider(
                    creds.getAccount(), creds.getProvider()
            ).orElseThrow(() -> new UsernameNotFoundException("회원이 없습니다."));
            if (!passwordEncoder.matches(creds.getSecret(), db.getPasswordHash())) {
                throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
            }
            memberId = db.getMemberId();
            role     = db.getRole();
        } else {
            Optional<AuthCredential> opt = loadAuthPort.findByAccountAndProvider(
                    creds.getAccount(), creds.getProvider()
            );
            AuthCredential db = opt.orElseGet(() -> {
                UUID newId = UUID.randomUUID();
                AuthCredential ac = AuthCredential.of(
                        newId,
                        creds.getAccount(),
                        "",
                        Role.USER,
                        creds.getProvider());
                saveAuthPort.save(ac);
                return ac;
            });
            memberId = db.getMemberId();
            role     = db.getRole();
        }

        String access  = jwtProvider.generateAccessToken(memberId, role.name());
        String refresh = jwtProvider.generateRefreshToken(memberId, role.name());
        return new TokenPair(
                new com.megacoffee.kiosk.auth.domain.model.AccessToken(
                        access, jwtProvider.getExpiryInstant(access)
                ),
                new com.megacoffee.kiosk.auth.domain.model.RefreshToken(
                        refresh, jwtProvider.getExpiryInstant(refresh)
                )
        );
    }

    @Override
    public AccessToken refresh(RefreshToken refreshToken) {
        var claims = jwtProvider.parseToken(refreshToken.getToken()).getBody();
        UUID memberId = UUID.fromString(claims.getSubject());
        String role   = claims.get("role", String.class);
        String newAccess = jwtProvider.generateAccessToken(memberId, role);
        return new AccessToken(newAccess, jwtProvider.getExpiryInstant(newAccess));
    }

    @Override
    public void logout(AccessToken accessToken) {
        // Stateless JWT: 로그아웃 시 클라이언트가 토큰을 폐기
        // 블랙리스트 사용 시 아래처럼 구현
        // tokenBlacklistService.blacklist(accessToken.getToken(),
        //     Duration.between(Instant.now(), accessToken.getExpiresAt()));
    }

    @Override
    public void deleteMember(UUID memberId) {
        // 인증 정보 삭제
        deleteAuthPort.deleteByMemberId(memberId);
        // 필요 시 회원 도메인 삭제 로직 호출
    }
}
