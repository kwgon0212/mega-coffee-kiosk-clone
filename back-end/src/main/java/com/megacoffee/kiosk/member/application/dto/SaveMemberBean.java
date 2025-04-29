package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.adapter.outbound.MemberJpaRepository;
import com.megacoffee.kiosk.member.adapter.outbound.MemberEntity;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SaveMemberBean {
    private final MemberJpaRepository jpaRepo;

    public Member exec(Member member){
        MemberEntity entity = MemberEntity.fromDomain(member);
        MemberEntity saved = jpaRepo.save(entity);
        return saved.toDomain();
    }
}
