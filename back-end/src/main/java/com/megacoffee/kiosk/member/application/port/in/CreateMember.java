package com.megacoffee.kiosk.member.application.port.in;

import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;

import java.util.UUID;

public interface CreateMember {

    UUID exec(CreateMemberCommand command);
}