//package com.megacoffee.kiosk.member.application.dto;
//
//import ch.qos.logback.core.spi.ErrorCodes;
//import com.megacoffee.global.error.CustomException;
//import com.megacoffee.global.error.ErrorCode;
//import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestLoginDTO;
//import com.megacoffee.kiosk.member.adapter.inbound.dto.ResponseLoginDTO;
//import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
//import com.megacoffee.kiosk.member.domain.Member;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//
//import java.util.NoSuchElementException;
//
//@Component
//@RequiredArgsConstructor
//public class LoginBean {
//    private final MemberRepository memberRepository;
//
//    public Member exec(RequestLoginDTO requestLoginDTO){
//        String account = requestLoginDTO.getAccount();
//        String password = requestLoginDTO.getPassword();
//        Member member = memberRepository.findByAccount(account).
//                orElseThrow(() -> new NoSuchElementException("회원이 없습니다. id=" + account));
//        if (password.equals(member.getPassword())) {
//            return member;
//        } else {
//            throw new CustomException(ErrorCode.PASSWORD_NOT_MATCH);
//        }
//    }
//}
