package com.megacoffee.kiosk.member.application;

import com.megacoffee.kiosk.member.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    public void save(Member member);
    public Optional<Member> findById(Long id);
    public void deleteById(Long id);
    public List<Member> findAll();
    public List<Member> findByName(String name);
    public void updateNickname(Member member, String nickname);
    public void updatePhoneNumber(Member member, String phoneNumber);
    public void updateName(Member member, String name);

}
