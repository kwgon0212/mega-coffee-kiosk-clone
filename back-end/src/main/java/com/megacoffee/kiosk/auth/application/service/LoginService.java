package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.auth.application.port.in.LoginMember;
import com.megacoffee.kiosk.auth.application.port.out.LoadPort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class LoginService implements LoginMember {
    private final LoadPort loadPort;
    private final PasswordEncoder passwordEncoder;
    private final MemberRepository memberRepository;

    @Override
    public Member login(RequestLogin credentials) throws AuthenticationException {
        AuthCredentials cd = loadPort.getByAccount(credentials.getAccount());

        if (!passwordEncoder.matches(credentials.getPassword(), cd.getPasswordHash())) {
            throw new AuthenticationException("비밀번호가 일치하지 않습니다.");
        } else {
            return memberRepository.findById(cd.getMemberId()).orElse(null);

        }
    }

}

