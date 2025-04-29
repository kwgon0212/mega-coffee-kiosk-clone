package com.megacoffee.kiosk.member.domain;

import java.time.LocalDate;
import java.util.UUID;

public class Member {
    // 고유 식별자
    private final UUID id;
    // 비즈니스 속성
    private String account;
    private String password;
    private String name;
    private String nickName;
    private Gender gender;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private Role role;

    // 생성자: 필수 속성만 받도록
    public Member(UUID id,
                  String account,
                  String password,
                  String name,
                  String nickName,
                  Gender gender,
                  String phoneNumber,
                  LocalDate dateOfBirth,
                  Role role) {
        // (유효성 검증 등 도메인 로직 수행)
        this.id       = id;
        this.account  = account;
        this.password = password;
        this.name     = name;
        this.nickName = nickName;
        this.gender   = gender;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.role     = role;
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

    // (getter만 제공, setter 없음)
    public UUID getId() {
        return id; }
    public String getAccount() {
        return account; }
    public String getName() {
        return name; }
    public String getNickName() {
        return nickName; }
    public String getPassword() {
        return password;
    }
    public Gender getGender() {
        return gender;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    public Role getRole() {
        return role;
    }
}
