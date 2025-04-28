package com.megacoffee.kiosk.member.outbound;

import com.megacoffee.kiosk.member.application.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepository {

    @PersistenceContext
    private final EntityManager em;

    @Override
    public void save(Member member) {
        em.persist(member);
    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(em.find(Member.class, id));
    }

    @Override
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

    @Override
    public List<Member> findByName(String name) {
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
    }

    @Override
    public void deleteById(Long id) {
        em.remove(em.find(Member.class, id));
    }

    @Override
    public void updateNickname(Member member, String nickname) {
        Member existingMember = em.find(Member.class, member.getId());
        existingMember.updateNickname(nickname);
        em.merge(existingMember);
    }

    @Override
    public void updatePhoneNumber(Member member, String phoneNumber) {
        Member existingMember = em.find(Member.class, member.getId());
        existingMember.updateNickname(phoneNumber);
        em.merge(existingMember);
    }

    @Override
    public void updateName(Member member, String name) {
        Member existingMember = em.find(Member.class, member.getId());
        existingMember.updateNickname(name);
        em.merge(existingMember);
    }
}
