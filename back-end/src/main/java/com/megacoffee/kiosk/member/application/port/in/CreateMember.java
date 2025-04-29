package com.megacoffee.kiosk.member.application.port.in;

import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;

public interface CreateMember {
    boolean exec(CreateMemberCommand command);
}
