package com.megacoffee.kiosk.member.domain;

import com.megacoffee.kiosk.order.domain.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
public class Member {

    @Id @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_account")
    private String account;

    @Column(name = "member_pw")
    private String password;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_gender")
    private Gender gender;

    @Column(name = "member_phonenumber")
    private String phoneNumber;

    @Column(name = "member_birth")
    private Date birth;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role")
    private Role role;

    public void updateName(String name) {
        this.name = name;
    }
    public void updatePhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }
//    protected Member() {}
//    public Member(String account, String password, String name, String nickname, Gender gender, Role role) {
//        this.account = account;
//        this.password = password;
//        this.name = name;
//        this.nickname = nickname;
//        this.gender = gender;
//        this.role = role;
//    }
//
//    @OneToMany(mappedBy = "member")
//    private List<OrderMenu> ordermenus = new ArrayList<>();
}
