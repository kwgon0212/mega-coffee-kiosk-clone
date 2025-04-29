package com.megacoffee.kiosk.member.application;

import com.megacoffee.kiosk.member.adapter.outbound.MemberEntity;
import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService  {

    private final MemberJpaRepository memberJpaRepository;

    @Transactional
    public Long join(MemberEntity member) {
        // 회원 가입 로직
        validateDuplicateMember(member);
        memberJpaRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(MemberEntity member) {
        // 중복 회원 검증
        memberJpaRepository.findById(member.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    public MemberEntity findOne(Long memberId) {
        return memberJpaRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public List<MemberEntity> findMembers() {
        return memberJpaRepository.findAll();
    }
    public Long updateMember(Long Id, String nickname, String phoneNumber, String name) {
        MemberEntity member = findOne(Id);
        memberJpaRepository.updateNickname(member, nickname);
        memberJpaRepository.updatePhoneNumber(member, phoneNumber);
        memberJpaRepository.updateName(member, name);
        return member.getId();
    }
}
