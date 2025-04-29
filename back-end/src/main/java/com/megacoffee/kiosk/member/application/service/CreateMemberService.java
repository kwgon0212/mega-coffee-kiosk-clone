package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
import com.megacoffee.kiosk.member.application.dto.CreateMemberMapper;
import com.megacoffee.kiosk.member.application.dto.SaveMemberBean;
import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestCreateMemberDTO;
import com.megacoffee.kiosk.member.application.port.in.CreateMember;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateMemberService implements CreateMember {
    private final CreateMemberMapper createMemberMapper;
    private final SaveMemberBean saveMemberBean;

    @Override
    public boolean exec(CreateMemberCommand cmd) {
        Member domain = createMemberMapper.toDomain(cmd);
        saveMemberBean.exec(domain);
        return true;
    }
}
