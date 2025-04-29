package com.megacoffee.kiosk.member.adapter.outbound;

import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Persistence adapter implementing the MemberRepository port.
 */
@Repository
@RequiredArgsConstructor
public class MemberPersistenceAdapter implements MemberRepository {
    private final MemberJpaRepository jpaRepository;

    @Override
    public Optional<Member> findById(UUID id) {
        return jpaRepository.findById(id)
                .map(MemberEntity::toDomain);
    }

    @Override
    public Member save(Member member) {
        MemberEntity entity = MemberEntity.fromDomain(member);
        MemberEntity saved  = jpaRepository.save(entity);
        return saved.toDomain();
    }
}
