package com.megacoffee.kiosk.member.adapter.outbound;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import com.megacoffee.kiosk.member.domain.Gender;
import com.megacoffee.kiosk.member.domain.Member;
import com.megacoffee.kiosk.member.domain.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberEntity {

    @Id
    @Column(
            name             = "member_id",
            updatable        = false,
            nullable         = false,
            length           = 36,
            columnDefinition = "CHAR(36)"
    )
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID memberId;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_nickname")
    private String nickName;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_gender")
    private Gender gender;

    @Column(name = "member_phonenumber")
    private String phoneNumber;

    @Column(name = "member_birth")
    private LocalDate birth;

    public Member toDomain() {
        return new Member(
                this.memberId,
                this.name,
                this.nickName,
                this.gender,
                this.phoneNumber,
                this.birth
        );
    }

    public static MemberEntity fromDomain(Member domain) {
        return MemberEntity.builder()
                .memberId(domain.getId())
                .name(domain.getName())
                .nickName(domain.getNickName())
                .gender(domain.getGender())
                .phoneNumber(domain.getPhoneNumber())
                .birth(domain.getBirth())
                .build();
    }

//    @OneToMany(mappedBy = "member")
//    private List<OrderMenu> ordermenus = new ArrayList<>();
}
