//package com.megacoffee.kiosk.member.application.service;
//
//import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestLoginDTO;
//import com.megacoffee.kiosk.member.adapter.inbound.dto.ResponseLoginDTO;
//import com.megacoffee.kiosk.member.application.dto.GetUserEntityBean;
//import com.megacoffee.kiosk.member.application.dto.LoginBean;
//import com.megacoffee.kiosk.member.application.dto.LoginDTOMapper;
//import com.megacoffee.kiosk.member.application.port.in.LoginMember;
//import com.megacoffee.kiosk.member.domain.Member;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@Service
//@Transactional(readOnly = true)
//@RequiredArgsConstructor
//public class LoginService implements LoginMember {
//    private final LoginBean loginBean;
//    private final LoginDTOMapper loginDTOMapper;
//
//    @Override
//    public ResponseLoginDTO exec(RequestLoginDTO requestLoginDTO) {
//        return loginDTOMapper.exec(loginBean.exec(requestLoginDTO));
//    }
//}
