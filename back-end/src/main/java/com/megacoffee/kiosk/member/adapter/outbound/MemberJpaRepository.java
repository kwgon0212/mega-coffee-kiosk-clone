package com.megacoffee.kiosk.member.adapter.outbound;


import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;
import java.util.UUID;

public interface MemberJpaRepository extends JpaRepository<MemberEntity, UUID> {
//    Optional<MemberEntity> findByMemberAccount(String account);
//        List<MemberEntity> findAll();
//    public void save(Member member);
//    public void deleteById(Long id);
//    public Optional<Member> findById(Long id);

//    public List<Member> findByName(String name);
//    public void updateNickname(Member member, String nickname);
//    public void updatePhoneNumber(Member member, String phoneNumber);
}
