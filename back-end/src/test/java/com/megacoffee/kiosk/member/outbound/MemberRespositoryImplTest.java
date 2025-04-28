package com.megacoffee.kiosk.member.outbound;

import com.megacoffee.kiosk.member.domain.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MemberRepositoryImplTest {
    @Autowired MemberRepositoryImpl memberRepository;
    @Test
    void testSave() {
        Member member = new Member();
        memberRepository.save(member);
        Optional<Member> member1 = memberRepository.findById(member.getId());
        assertThat(member1).isEqualTo(member);
    }
    public void 회원_이름_업데이트() {
        //Given
        Member member = new Member();
        memberRepository.save(member);
        String newName = "newName";
        //When
        memberRepository.updateName(member, newName);
        String name = member.getName();
        //Then
        assertThat(name).isEqualTo(newName);
    }
}