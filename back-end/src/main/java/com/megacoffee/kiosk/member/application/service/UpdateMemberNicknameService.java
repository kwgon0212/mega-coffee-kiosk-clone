package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.application.port.in.UpdateMemberNickName;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UpdateMemberNicknameService implements UpdateMemberNickName {

    // 포트 인터페이스 주입
    private final MemberRepository memberRepository;

    @Override
    public void exec(UUID memberId, String newNickName) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + memberId));

        member.changeNickName(newNickName);
        memberRepository.save(member);
    }
}
