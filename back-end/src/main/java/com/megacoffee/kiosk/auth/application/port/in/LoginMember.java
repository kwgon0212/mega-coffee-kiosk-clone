package com.megacoffee.kiosk.auth.application.port.in;

import com.megacoffee.kiosk.auth.adapter.in.dto.RequestLogin;
import com.megacoffee.kiosk.auth.adapter.in.dto.ResponseLogin;
import com.megacoffee.kiosk.member.domain.Member;

import javax.naming.AuthenticationException;
import java.util.UUID;

public interface LoginMember {
    Member login(RequestLogin credentials)throws AuthenticationException;
}
