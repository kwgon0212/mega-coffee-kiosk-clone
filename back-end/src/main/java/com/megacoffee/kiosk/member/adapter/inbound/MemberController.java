package com.megacoffee.kiosk.member.adapter.inbound;

import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestCreateMemberDTO;
import com.megacoffee.kiosk.member.adapter.inbound.dto.RequestLoginDTO;
import com.megacoffee.kiosk.member.adapter.inbound.dto.ResponseGetMemberDTO;
import com.megacoffee.kiosk.member.adapter.inbound.dto.ResponseLoginDTO;
import com.megacoffee.kiosk.member.application.dto.CreateMemberCommand;
import com.megacoffee.kiosk.member.application.port.in.*;

import com.megacoffee.kiosk.member.domain.Member;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MemberController {

    private final CreateMember createMember;
    private final UpdateMemberNickName updateMemberNickName;
    private final GetMember getMember;
    private final GetAllMember getAllMember;
    private final LoginMember loginMember;

    @PostMapping("/register")
    @Operation(summary = "회원가입", description = "유저의 정보를 받아서 회원가입을 진행합니다.")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody RequestCreateMemberDTO dto) {
        CreateMemberCommand cmd = new CreateMemberCommand(
                dto.getMemberAccount(),
                dto.getMemberPw(),
                dto.getName(),
                dto.getNickName(),
                dto.getGender(),
                dto.getPhoneNumber(),
                dto.getDate(),
                dto.getRole()
        );
        UUID newId = createMember.exec(cmd);
        boolean success = newId != null;
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", success);
        responseMap.put("message", success ? "회원 가입 성공" : "회원 가입 실패");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
    }

    @PostMapping("/auth/login")
    @Operation(summary = "로그인", description = "아이디,이메일 과 비밀번호를 입력받아서 로그인을 진행합니다.")
    public ResponseEntity<Map<String, Object>> login(@RequestBody RequestLoginDTO reqLogin){
        //login 서비스 호출
        ResponseLoginDTO responseLoginDTO = loginMember.exec(reqLogin);
        //응답 전송
        boolean success = responseLoginDTO != null;

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("success", success);
        responseMap.put("message", success ? "로그인 성공" : "로그인 실패");
        responseMap.put("userInfo", responseLoginDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap);
    }

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
