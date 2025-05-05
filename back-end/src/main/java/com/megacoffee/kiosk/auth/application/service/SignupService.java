package com.megacoffee.kiosk.auth.application.service;

import com.megacoffee.kiosk.auth.adapter.in.dto.RegisterRequest;
import com.megacoffee.kiosk.auth.application.port.in.SignupMember;
import com.megacoffee.kiosk.auth.application.port.out.SavePort;
import com.megacoffee.kiosk.auth.domain.model.AuthCredentials;
import com.megacoffee.kiosk.auth.domain.model.Credentials;
import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SignupService implements SignupMember {
    private final PasswordEncoder passwordEncoder;
    private final SavePort saveport;
    private final MemberRepository memberRepository;

    @Override
    public UUID signup(RegisterRequest req) {
//        if (memberRepository.existsByNickName(req.getNickName())) {
//            throw new DuplicateNicknameException("이미 사용 중인 닉네임입니다.");
//        }

        UUID newId = UUID.randomUUID();
        String hashed = passwordEncoder.encode(req.getPassword());

        Member member = new Member(newId, req.getName(), req.getNickName(), req.getGender(), req.getPhoneNumber(), req.getBirth());

        memberRepository.save(member);

        AuthCredentials ac = AuthCredentials.of(
                newId,
                req.getAccount(),
                hashed,
                Role.USER
        );
        saveport.save(ac);

        return newId;
    }
}

