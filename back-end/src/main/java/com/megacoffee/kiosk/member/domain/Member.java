package com.megacoffee.kiosk.member.domain;

import lombok.Getter;

import java.time.LocalDate;
import java.util.UUID;
@Getter
public class Member {
    // 고유 식별자
    private final UUID id;
    // 비즈니스 속성
    private final String name;
    private String nickName;
    private final Gender gender;
    private final String phoneNumber;
    private final LocalDate birth;

    // 생성자: 필수 속성만 받도록
    public Member(UUID id,
                  String name,
                  String nickName,
                  Gender gender,
                  String phoneNumber,
                  LocalDate birth) {
        // (유효성 검증 등 도메인 로직 수행)
        this.id       = id;
        this.name     = name;
        this.nickName = nickName;
        this.gender   = gender;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
    }

    // 비즈니스 메서드 예: 닉네임 변경
    public void changeNickName(String newNickName) {
        if (newNickName == null || newNickName.isBlank()) {
            throw new IllegalArgumentException("닉네임은 비워둘 수 없습니다.");
        }
        this.nickName = newNickName;
    }

//    // 비밀번호 검증
//    public boolean verifyPassword(String rawPassword) {
//        // 예: 해시 비교 로직
//        return PasswordEncoder.matches(rawPassword, this.password);
//    }

}
