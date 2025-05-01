package com.megacoffee.kiosk.auth.adapter.inbound;

import com.megacoffee.kiosk.auth.application.dto.LoginCommand;
import com.megacoffee.kiosk.auth.application.dto.SignupCommand;
import com.megacoffee.kiosk.auth.application.port.in.DeleteMember;
import com.megacoffee.kiosk.auth.application.port.in.LoginMember;
import com.megacoffee.kiosk.auth.application.port.in.LogoutMember;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.domain.model.AccessToken;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OauthProvider;
import com.megacoffee.kiosk.auth.domain.service.TokenPair;
import com.megacoffee.kiosk.auth.infrastructure.jwt.JwtProvider;
import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
import com.megacoffee.kiosk.member.application.port.in.CreateMember;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {

    private final SignupMember signupMember;
    private final CreateMember createMember;
    private final LoginMember loginMember;
    private final LogoutMember logoutMember;
    private final DeleteMember deleteMember;
    private final JwtProvider jwtProvider;
    private final MemberRepository memberRepository;

    /**
     * 회원가입
     */
    @PostMapping("/register")
    public ResponseEntity<BasicResponse> register(@RequestBody RegisterRequest req) {
        // 1) AuthCredential 저장 → memberId 리턴
        UUID memberId = signupMember.exec(new SignupCommand(
                req.getName(), req.getAccount(), req.getPassword(),
                req.getPhonenumber(), req.getNickName()
        ));

        // 2) Member 프로필 저장 (같은 memberId 사용)
        createMember.exec(new CreateMemberCommand(
                memberId,                 // ← 여기
                req.getAccount(),
                req.getPassword(),
                req.getName(),
                req.getNickName(),
                null,
                req.getPhonenumber(),
                null,
                Role.USER
        ));

        return ResponseEntity
                .created(URI.create("/api/auth/login"))
                .body(new BasicResponse(true, "회원가입 성공"));
    }

    /**
     * 로그인
     */
    @PostMapping("/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {
        // 1) 로그인 → 토큰 페어 반환
        TokenPair pair = loginMember.exec(
                new LoginCommand(req.getAccount(), req.getPassword(), OauthProvider.LOCAL)
        );

        UUID memberId = UUID.fromString(
                jwtProvider.parseToken(pair.getAccessToken().getToken())
                        .getBody().getSubject()
        );
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다." ));

        UserInfo info = new UserInfo(
                member.getId(),
                member.getName(),
                member.getAccount(),
                member.getNickName()
        );
        return ResponseEntity.ok(new LoginResponse(
                true,
                "로그인 성공",
                info,
                pair.getAccessToken().getToken(),
                pair.getRefreshToken().getToken()
        ));
    }

    /**
     * 로그아웃
     */
    @PostMapping("/auth/logout")
    public ResponseEntity<BasicResponse> logout(@RequestBody LogoutRequest req) {
        logoutMember.exec(req.getAccessToken());
        return ResponseEntity.ok(new BasicResponse(true, "로그아웃 성공"));
    }

    /**
     * 회원탈퇴
     */
    @PostMapping("/auth/withdraw")
    public ResponseEntity<BasicResponse> withdraw(@RequestBody WithdrawRequest req) {
        deleteMember.exec(req.getUserId());
        return ResponseEntity.ok(new BasicResponse(true, "회원탈퇴 성공"));
    }

    // DTOs
    @Data
    public static class RegisterRequest {
        private String name;
        private String account;
        private String password;
        private String phonenumber;
        private String nickName;
    }

    @Data
    public static class LoginRequest {
        private String account;
        private String password;
    }

    @Data
    public static class LogoutRequest {
        private AccessToken accessToken;
    }

    @Data
    public static class WithdrawRequest {
        private UUID userId;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BasicResponse {
        private boolean success;
        private String message;
    }

    @Data
    @AllArgsConstructor
    public static class LoginResponse {
        private boolean success;
        private String message;
        private UserInfo userInfo;
        private String accessToken;
        private String refreshToken;
    }

    @Data
    @AllArgsConstructor
    public static class UserInfo {
        private UUID userId;
        private String name;
        private String account;
        private String nickName;
    }
}
