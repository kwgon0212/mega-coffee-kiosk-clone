package com.megacoffee.kiosk.create;

import com.megacoffee.kiosk.member.adapter.inbound.MemberController;
import com.megacoffee.kiosk.member.adapter.outbound.MemberEntity;
import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
// ───────────────────────────────────────
// 아래 두 애노테이션로 MemberEntity, MemberJpaRepository만 로드
@EntityScan(basePackageClasses = MemberEntity.class)
@EnableJpaRepositories(basePackageClasses = MemberJpaRepository.class)
@Transactional// 테스트 완료 후 롤백
class MemberPersistenceIntegrationTest {

    @Autowired
    private MemberJpaRepository jpaRepository;

    private MemberController memberController;
    @Test
    void 실제MySQL에_데이터가_저장되는지_확인() {
        // 1) 테스트용 엔티티 생성
        UUID id = UUID.randomUUID();
        MemberEntity entity = MemberEntity.builder()
                .memberId(id)
                .memberAccount("testUser")
                .memberPw("pw123")
                .name("테스트유저")
                .nickName("tester")
                .gender(Gender.MALE)
                .phoneNumber("010-0000-0000")
                .birth(LocalDate.of(2000,1,1))
                .role(Role.USER)
                .build();

        // 2) 저장 및 플러시
        jpaRepository.saveAndFlush(entity);

        // 3) 저장된 데이터 조회
        List<MemberEntity> all = jpaRepository.findAll();
        assertThat(all).isNotEmpty();

        MemberEntity saved = all.stream()
                .filter(e -> e.getMemberAccount().equals("testUser"))
                .findFirst()
                .orElseThrow();

        // 4) 필드 값 검증
        assertThat(saved.getName()).isEqualTo("테스트유저");
        assertThat(saved.getBirth()).isEqualTo(LocalDate.of(2000,1,1));
    }
}
