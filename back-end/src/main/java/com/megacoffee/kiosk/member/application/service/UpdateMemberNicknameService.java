package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.application.port.in.UpdateMemberNickname;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UpdateMemberNicknameService implements UpdateMemberNickname {
    private final MemberJpaRepository memberRepo;  // application.port.out

    @Override
    public void exec(UUID memberId, String newNickName) {
        // ① 도메인 객체 조회
        Member member = memberRepo.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + memberId));

        // ② 도메인 행위로 닉네임 변경
        member.changeNickName(newNickName);

        // ③ 저장 (포트 통해 어댑터로 전파)
        memberRepo.save(member);
    }
}