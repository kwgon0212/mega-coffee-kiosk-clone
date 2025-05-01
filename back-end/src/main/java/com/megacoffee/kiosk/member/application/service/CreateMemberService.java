package com.megacoffee.kiosk.member.application.service;

import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
import com.megacoffee.kiosk.member.application.dto.CreateMemberMapper;
import com.megacoffee.kiosk.member.application.dto.SaveMemberBean;
import com.megacoffee.kiosk.member.application.port.in.CreateMember;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class CreateMemberService implements CreateMember {
    private final CreateMemberMapper createMemberMapper;
    private final SaveMemberBean saveMemberBean;

    @Override
    public UUID exec(CreateMemberCommand cmd) {
        Member domain = createMemberMapper.toDomain(cmd);
        saveMemberBean.exec(domain);
        return domain.getId();
    }
}
