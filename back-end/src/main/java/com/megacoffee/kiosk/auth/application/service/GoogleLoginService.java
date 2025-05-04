package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.application.port.in.GoogleLogin;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.application.port.out.LoadPort;
import com.megacoffee.kiosk.auth.application.port.out.SavePort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.auth.domain.model.OAuthLoginDto;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoogleLoginService implements GoogleLogin {

    @Value("${google.client-id}")
    private String clientId;

    @Value("${google.client-secret}")
    private String clientSecret;

    @Value("${google.redirect-uri}")
    private String redirectUri;

    private final RestTemplate restTemplate = new RestTemplate();
    private final SavePort savePort;
    private final LoadPort loadPort;
    private final SignupMember signupMember;
    private final MemberRepository memberRepository;

    @Override
    public ResponseLogin login(OAuthLoginDto oAuthLoginDto) {
        String code = oAuthLoginDto.getCode();

        String tokenUri = "https://oauth2.googleapis.com/token";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String,String> googlePrams = new LinkedMultiValueMap<>();
        googlePrams.add("code",code);
        googlePrams.add("client_id", clientId);
        googlePrams.add("client_secret", clientSecret);
        googlePrams.add("redirect_uri", redirectUri);
        googlePrams.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String,String>> googleRequest = new HttpEntity<>(googlePrams, headers);

        Map tokenResponse = restTemplate.postForObject(tokenUri, googleRequest, Map.class);
        String accessToken = (String) tokenResponse.get("access_token");

        HttpHeaders userHeaders = new HttpHeaders();
        userHeaders.setBearerAuth(accessToken);
        HttpEntity<Void> userRequest = new HttpEntity<>(userHeaders);

        ResponseEntity<Map> userResponse = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                HttpMethod.GET,
                userRequest,
                Map.class
        );
//        ------------------------------------------------------------------------------//
        Map userData = userResponse.getBody();

        String email = (String) userData.get("email");
        String name = (String) userData.get("name");
        String nick =(String) userData.get("given_name");

        AuthCredentials existingUser = loadPort.getByAccount(email);

        if (existingUser != null) {
            UUID userid= existingUser.getMemberId();

            return new ResponseLogin(existingUser.getMemberId(),name,existingUser.getAccount(),nick);  // 이미 가입된 사용자 → 저장하지 않고 ID 반환
        }

        RegisterRequest req = new RegisterRequest(name,email,"","",nick,null,null);
        UUID userId=signupMember.signup(req);

        Member member = memberRepository.findById(userId).orElse(null);
        AuthCredentials authCredentials= loadPort.getByAccount(email);
        return new ResponseLogin(userId, member.getName(), authCredentials.getAccount(), member.getNickName());
    }
}
