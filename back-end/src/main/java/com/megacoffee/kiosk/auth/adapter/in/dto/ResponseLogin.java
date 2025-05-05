package com.megacoffee.kiosk.auth.adapter.in.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ResponseLogin {
    private UUID userId;
    private String name;
    private String account;
    private String nickName;

}
