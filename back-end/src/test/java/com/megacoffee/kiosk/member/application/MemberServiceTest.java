package com.megacoffee.kiosk.member.application;

import com.megacoffee.kiosk.member.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberServiceTest {
    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;
    @Test
    public void 회원_가입() {
        //Given
        Member member = new Member();
        Long id = memberService.join(member);
        assertThat(id).isEqualTo(1L);

        //When

        //Then

    }

}