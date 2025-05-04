package com.megacoffee.kiosk.auth.adapter.in;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;
import com.megacoffee.kiosk.auth.domain.service.AuthService;
import com.megacoffee.kiosk.config.JwtUtil;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.member.domain.Role;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.naming.AuthenticationException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final JwtUtil jwtUtil;


    /** 회원가입 */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest req) {
        Credentials credentials = Credentials.of(req.getAccount(), req.getPassword());
        UUID memberId = authService.signUp(req);
        boolean success = memberId != null;

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "회원 가입 성공" : "회원 가입 실패");
//        response.put("userId", success ? memberId : "00000000-0000-0000-0000-000000000000");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    /** 로컬 로그인 */
    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, Object>>  login(@RequestBody RequestLogin requestLogin) throws AuthenticationException {
        Member member = authService.login(requestLogin);
        ResponseLogin responseLogin = new ResponseLogin(
                member.getId(),
                member.getNickName(),
                requestLogin.getAccount(),
                member.getNickName()
        );
        boolean success = true;

        String accessToken = null;

        if (success) {
            accessToken = jwtUtil.generateToken(member.getId(), Role.USER);
        }


        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "로그인 성공" : "로그인 실패");
        response.put("userInfo", responseLogin);
        response.put("accessToken", accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/auth/google")
    public void redirectToGoogleLogin(HttpServletResponse response) throws IOException {
        System.out.println("IN google CONTROLLER");
        String googleAuthUrl = authService.googleRedirect();
        response.sendRedirect(googleAuthUrl);
    }


    /** 구글 로그인 **/
    @GetMapping("/auth/google/callback")
    public ResponseEntity<Map<String, Object>> oauthGoogleLogin (@RequestParam("code") String code) {
        System.out.println("IN CALLBACK CONTROLLER");
        ResponseLogin responseLogin  = authService.googleLogin(new OAuthLoginDto(code));
        boolean success = responseLogin != null;

        String accessToken = null;
        if (success) {
            accessToken = jwtUtil.generateToken(responseLogin.getUserId(), Role.USER);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "로그인 성공" : "로그인 실패");
        response.put("userInfo", responseLogin);
        response.put("accessToken", success ? accessToken : "토큰 발급 실패");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @GetMapping("/auth/kakao")
    public void redirectToKakaoLogin(HttpServletResponse response) throws IOException {
        System.out.println("IN google CONTROLLER");
        String googleAuthUrl = authService.kakaoRedirect();
        response.sendRedirect(googleAuthUrl);
    }


    /** 카카오 로그인 **/
    @GetMapping("/auth/kakao/callback")
    public ResponseEntity<Map<String, Object>> oauthKakaoLogin (@RequestParam("code") String code) {
        System.out.println("IN CALLBACK CONTROLLER");
        ResponseLogin responseLogin  = authService.kakaoLogin(new OAuthLoginDto(code));
        boolean success = responseLogin != null;

        String accessToken = null;
        if (success) {
            accessToken = jwtUtil.generateToken(responseLogin.getUserId(), Role.USER);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "로그인 성공" : "로그인 실패");
        response.put("userInfo", responseLogin);
        response.put("accessToken", success ? accessToken : "토큰 발급 실패");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    /** 로그아웃 */
    @PostMapping("/auth/logout")
    public ResponseEntity<BasicResponse> logout(@RequestBody UUID memberId) {
        authService.deletedMember(memberId);
        return ResponseEntity.ok(new BasicResponse(true, "로그아웃 성공"));
    }

    /** 회원탈퇴 */
    @PostMapping("/auth/withdraw")
    public ResponseEntity<BasicResponse> withdraw(@RequestBody WithdrawRequest req) {
        authService.deletedMember(req.getUserId());
        return ResponseEntity.ok(new BasicResponse(true, "회원탈퇴 성공"));
    }

    // --- DTOs ---





    @Data
    public static class WithdrawRequest {
        private UUID userId;
    }

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class BasicResponse {
        private boolean success;
        private String message;
    }

}