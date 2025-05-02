package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.adapter.outbound.MemberEntity;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SaveMemberBean {
    private final MemberRepository memberRepository;

    public Member exec(Member member){
        return  memberRepository.save(member);
    }
}
