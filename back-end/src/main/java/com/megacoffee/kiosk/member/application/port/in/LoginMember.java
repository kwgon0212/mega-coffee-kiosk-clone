package com.megacoffee.kiosk.member.application.port.in;

import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestLoginDTO;
import com.megacoffee.kiosk.member.application.dto.GetUserEntityBean;
import com.megacoffee.kiosk.member.domain.Member;

public interface LoginMember {
    boolean exec(RequestLoginDTO requestLoginDTO);
}
