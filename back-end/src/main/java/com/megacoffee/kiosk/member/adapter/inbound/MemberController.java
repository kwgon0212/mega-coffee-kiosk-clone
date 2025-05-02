package com.megacoffee.kiosk.member.adapter.inbound;

import com.megacoffee.kiosk.member.adapter.inbound.dto.ResponseGetMemberDTO;
import com.megacoffee.kiosk.member.application.port.in.*;
import com.megacoffee.kiosk.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final UpdateMemberNickName updateMemberNickName;
    private final GetMember getMember;
    private final GetAllMember getAllMember;

    @PatchMapping("/{id}/nickname")
    public ResponseEntity<Void> changeNickname(@PathVariable UUID id, @RequestBody NicknameRequest req) {
        updateMemberNickName.exec(id, req.getNickName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseGetMemberDTO> getMember(@PathVariable("id") UUID id) {
        Member member=getMember.exec(id);
        return ResponseEntity.ok(ResponseGetMemberDTO.fromDomain(member));
    }

    @GetMapping
    public ResponseEntity<List<ResponseGetMemberDTO>> listMembers() {
        List<ResponseGetMemberDTO> list = getAllMember.exec().stream()
                .map(ResponseGetMemberDTO::fromDomain)
                .toList();
        return ResponseEntity.ok(list);
    }


    @Data @AllArgsConstructor
    static class NicknameRequest {
        private String nickName;
    }

}
