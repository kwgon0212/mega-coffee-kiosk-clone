package com.megacoffee.kiosk.member.adapter.inbound.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
public class RequestCreateMemberDTO {
    String memberAccount;
    String memberPw;
    String name;
    String nickName;
    Gender gender;
    String phoneNumber;
    Date date;
    Role role;

}
