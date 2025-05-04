package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.application.port.in.KakaoLogin;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.application.port.out.LoadPort;
import com.megacoffee.kiosk.auth.application.port.out.SavePort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KakaoLoginService implements KakaoLogin {

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();
    private final SavePort savePort;
    private final LoadPort loadPort;
    private final SignupMember signupMember;
    private final MemberRepository memberRepository;

    @Override
    public ResponseLogin login(OAuthLoginDto oAuthLoginDto) {
        String code = oAuthLoginDto.getCode();
        // 1️⃣ 카카오 토큰 요청
        String tokenUri = "https://kauth.kakao.com/oauth/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> kakaoParams = new LinkedMultiValueMap<>();
        kakaoParams.add("grant_type", "authorization_code");
        kakaoParams.add("client_id", clientId);
        kakaoParams.add("redirect_uri", redirectUri);
        kakaoParams.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(kakaoParams, headers);

        Map tokenResponse = restTemplate.postForObject(tokenUri, kakaoRequest, Map.class);
        String accessToken = (String) tokenResponse.get("access_token");

        // 2️⃣ 사용자 정보 요청
        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);
        HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map> userResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                userRequest,
                Map.class
        );

        Map userData = userResponse.getBody();
        Map kakaoAccount = (Map) userData.get("kakao_account");
        Map properties = (Map) userData.get("properties");

        String email = kakaoAccount != null ? (String) kakaoAccount.get("email") : null;
        String name = properties != null ? (String) properties.get("nickname") : null;
        String nick = name;  // 카카오는 기본 nickname만 제공

        AuthCredentials existingUser = loadPort.getByAccount(email);

        if (existingUser != null) {
            return new ResponseLogin(existingUser.getMemberId(), name, existingUser.getAccount(), nick);
        }

        RegisterRequest req = new RegisterRequest(name, email, "", "", nick, null, null);
        UUID userId = signupMember.signup(req);

        Member member = memberRepository.findById(userId).orElse(null);
        AuthCredentials authCredentials = loadPort.getByAccount(email);
        return new ResponseLogin(userId, member.getName(), authCredentials.getAccount(), member.getNickName());
    }
}
