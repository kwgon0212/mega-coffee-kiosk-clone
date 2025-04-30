package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.NoSuchElementException;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class GetUserEntityBean {
    private final MemberRepository memberRepository;

    public Member exec(UUID memberId) {
        return  memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + memberId));
    }

}
