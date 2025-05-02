package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.application.dto.GetAllMemberBean;
import com.megacoffee.kiosk.member.application.port.in.GetAllMember;
import com.megacoffee.kiosk.member.application.port.in.GetMember;
import com.megacoffee.kiosk.member.application.port.out.MemberRepository;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GetAllMemberService implements GetAllMember {
    private final GetAllMemberBean getAllMemberBean;

    public List<Member> exec(){
        return getAllMemberBean.exec();
    }

}
