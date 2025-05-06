package com.megacoffee.kiosk.auth.adapter.in.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RegisterRequest {
    private String name;
    private String account;
    private String password;
    private String phoneNumber;
    private String nickName;
    private Gender gender;
    private LocalDate birth;

}