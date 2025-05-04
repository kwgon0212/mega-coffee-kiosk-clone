package com.megacoffee.kiosk.member.adapter.inbound.dto;

import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Role;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ResponseGetMemberDTO {
    private UUID id;
    private String name;
    private String nickName;
    private Gender gender;
    private String phoneNumber;
    private LocalDate dateOfBirth;

    public static ResponseGetMemberDTO fromDomain(Member m) {
        return new ResponseGetMemberDTO(
                m.getId(),
                m.getName(),
                m.getNickName(),
                m.getGender(),
                m.getPhoneNumber(),
                m.getBirth()
        );
    }
}
