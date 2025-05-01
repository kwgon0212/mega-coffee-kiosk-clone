package com.megacoffee.kiosk.member.adapter.inbound.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
@Data
@NoArgsConstructor
public class RequestCreateMemberDTO {
    String name;
    String nickName;
    Gender gender;
    String phoneNumber;
    LocalDate date;
    Role role;

}
