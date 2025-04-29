package com.megacoffee.kiosk.member.application.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMemberCommand {
    private String memberAccount;
    private String memberPw;
    private String name;
    private String nickName;
    private Gender gender;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private Role role;
}
