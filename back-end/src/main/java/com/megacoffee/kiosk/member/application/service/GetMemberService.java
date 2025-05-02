package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.application.dto.GetUserEntityBean;
import com.megacoffee.kiosk.member.application.port.in.GetMember;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetMemberService implements GetMember {

    private final GetUserEntityBean getUserEntityBean;

    public Member exec(UUID id){
        return getUserEntityBean.exec(id);
    }




}
