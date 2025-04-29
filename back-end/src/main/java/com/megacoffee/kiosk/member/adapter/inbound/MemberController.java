package com.megacoffee.kiosk.member.adapter.inbound;

import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestCreateMemberDTO;   // :contentReference[oaicite:12]{index=12}&#8203;:contentReference[oaicite:13]{index=13}
import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;          // :contentReference[oaicite:14]{index=14}&#8203;:contentReference[oaicite:15]{index=15}
import com.megacoffee.kiosk.member.application.service.MemberService;                    // :contentReference[oaicite:16]{index=16}&#8203;:contentReference[oaicite:17]{index=17}
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;  // 통합 서비스

    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody RequestCreateMemberDTO dto) {
        CreateMemberCommand cmd = new CreateMemberCommand(
                dto.getMemberAccount(),
                dto.getMemberPw(),
                dto.getName(),
                dto.getNickName(),
                dto.getGender(),
                dto.getPhoneNumber(),
                dto.getDate(),       // 개선 시 getDateOfBirth()
                dto.getRole()
        );
        UUID newId = memberService.join(cmd);
        return ResponseEntity
                .created(URI.create("/members/" + newId))
                .build();
    }

    @PatchMapping("/{id}/nickname")
    public ResponseEntity<Void> changeNickname(
            @PathVariable UUID id,
            @RequestBody NicknameRequest req
    ) {
        memberService.updateMember(id, req.getNickName());
        return ResponseEntity.noContent().build();
    }

    @Data @AllArgsConstructor
    static class NicknameRequest {
        private String nickName;
    }
}
