//package com.megacoffee.kiosk.member.application;
//
//import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
//import com.megacoffee.kiosk.member.application.dto.CreateMemberMapper;
//import com.megacoffee.kiosk.member.application.dto.SaveMemberBean;
//import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
//import com.megacoffee.kiosk.member.domain.Member;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.NoSuchElementException;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class MemberService {
//    private final MemberRepository memberRepository;
//    private final CreateMemberMapper createMapper;
//    private final SaveMemberBean saveBean;
//
//    @Transactional
//    public UUID join(CreateMemberCommand cmd) {
//        Member member = createMapper.toDomain(cmd);
//        Member saved = saveBean.exec(member);
//        return saved.getId();
//    }
//
//    @Transactional(readOnly = true)
//    public Member findOne(UUID memberId) {
//        return memberRepository.findById(memberId)
//                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + memberId));
//    }
//
////    @Transactional(readOnly = true)
////    public List<Member> findMembers() {
////        return memberRepository.findAll();
////    }
//
//    @Transactional
//    public void updateMember(UUID memberId,
//                             String newNickName) {
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + memberId));
//        member.changeNickName(newNickName);
//        // 도메인 메서드로 phoneNumber, name 변경 추가 가정
////        member.changePhoneNumber(phoneNumber);
////        member.changeName(name);
//        memberRepository.save(member);
//    }
//}
//
