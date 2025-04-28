package com.megacoffee.kiosk.member.application;

import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService  {

    private final MemberRepository memberRepository;

    @Transactional
    public Long join(Member member) {
        // 회원 가입 로직
        validateDuplicateMember(member);
        memberRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(Member member) {
        // 중복 회원 검증
        memberRepository.findById(member.getId())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }

    public Member findOne(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }
    public Long updateMember(Long Id, String nickname, String phoneNumber, String name) {
        Member member = findOne(Id);
        memberRepository.updateNickname(member, nickname);
        memberRepository.updatePhoneNumber(member, phoneNumber);
        memberRepository.updateName(member, name);
        return member.getId();
    }
}
