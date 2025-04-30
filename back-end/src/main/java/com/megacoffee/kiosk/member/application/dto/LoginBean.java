package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestLoginDTO;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LoginBean {
    private final GetUserEntityBean getUserEntityBean;

    public Member exec(RequestLoginDTO requestLoginDTO){
        String account = requestLoginDTO.getAccount();
        String password = requestLoginDTO.getPassword();
        Member member= getUserEntityBean.exec(account);
        if(password.equals(member.getPassword())){
            return member;
        }else {
            return
        }
    }
}
