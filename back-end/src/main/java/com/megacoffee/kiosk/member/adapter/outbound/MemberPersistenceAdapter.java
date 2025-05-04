package com.megacoffee.kiosk.member.adapter.outbound;

import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    @Override
    public List<Member> findAll(){
        return jpaRepository.findAll().stream().map(MemberEntity::toDomain).toList();
    }

    @Override
    public boolean existsByNickName(String nickName) {
        return false;
    }

//    @Override
//    public Optional<Member> findByAccount(String account) {
//        return jpaRepository.findByMemberAccount(account).map(MemberEntity::toDomain);
//    }
}
