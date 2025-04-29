package com.megacoffee.kiosk.create;

import com.megacoffee.kiosk.member.adapter.outbound.MemberEntity;
import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import static org.assertj.core.api.Assertions.assertThat;
import com.megacoffee.kiosk.member.application.dto.CreateMemberMapper;
import com.megacoffee.kiosk.member.domain.Member;



class CreateMemberMapperTest {

    private final CreateMemberMapper mapper = new CreateMemberMapper();

    @Test
    void dtoToEntity_매핑_테스트() {
        CreateMemberCommand cmd = new CreateMemberCommand(
                "userA",
                "pw1234",
                "홍길동",
                "nick",
                Gender.MALE,
                "010-1111-2222",
                LocalDate.of(1990, 1, 1),
                Role.USER
        );

        Member member = mapper.toDomain(cmd);

        // ID는 UUID.randomUUID() 이므로 null이 아니고, 버전4 UUID 포맷이어야 함
        assertThat(member.getId()).isNotNull();
        // 나머지 필드 매핑 검증
        assertThat(member.getAccount()).isEqualTo(cmd.getMemberAccount());
        assertThat(member.getPassword()).isEqualTo(cmd.getMemberPw());
        assertThat(member.getName()).isEqualTo(cmd.getName());
        assertThat(member.getNickName()).isEqualTo(cmd.getNickName());
        assertThat(member.getGender()).isEqualTo(cmd.getGender());
        assertThat(member.getPhoneNumber()).isEqualTo(cmd.getPhoneNumber());
        assertThat(member.getDateOfBirth()).isEqualTo(cmd.getDateOfBirth());
        assertThat(member.getRole()).isEqualTo(cmd.getRole());
    }

//    @Test
//    void entityToDto_매핑_테스트() {
//        MemberEntity entity = MemberEntity.builder()
//                .memberAccount("userB")
//                .memberPw("pw5678")
//                .name("김철수")
//                .nickName("chul")
//                .gender(Gender.FEMALE)
//                .phoneNumber("010-3333-4444")
//                .dateOfBirth(LocalDate.of(1985, 5, 15))
//                .role(Role.ADMIN)
//                .build();
//
//        CreateMemberCommand cmd = mapper.toCommand(entity);
//
//        assertThat(cmd.getMemberAccount()).isEqualTo(entity.getMemberAccount());
//        assertThat(cmd.getMemberPw()).isEqualTo(entity.getMemberPw());
//        assertThat(cmd.getName()).isEqualTo(entity.getName());
//        assertThat(cmd.getNickName()).isEqualTo(entity.getNickName());
//        assertThat(cmd.getGender()).isEqualTo(entity.getGender());
//        assertThat(cmd.getPhoneNumber()).isEqualTo(entity.getPhoneNumber());
//        assertThat(cmd.getDateOfBirth()).isEqualTo(entity.getDateOfBirth());
//        assertThat(cmd.getRole()).isEqualTo(entity.getRole());
//    }
}




