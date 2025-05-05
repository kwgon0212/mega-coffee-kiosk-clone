package com.megacoffee.kiosk.member.application.port.out;

import com.megacoffee.kiosk.member.domain.Member;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository {
    Optional<Member> findById(UUID id);
    Member save(Member member);
    List<Member> findAll();
    boolean existsByNickName(String nickName);
//    Optional<Member> findByAccount(String account);
}
