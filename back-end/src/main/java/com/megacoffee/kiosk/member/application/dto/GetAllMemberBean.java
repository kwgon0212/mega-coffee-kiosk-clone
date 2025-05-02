package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GetAllMemberBean {
    private final MemberRepository memberRepository;

    public List<Member> exec(){
        return memberRepository.findAll();
    }

}
