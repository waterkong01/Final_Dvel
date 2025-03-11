package kh.BackendCapstone.controller;

import kh.BackendCapstone.dto.request.PsContentsReqDto;
import kh.BackendCapstone.dto.request.PsWriteDto;
import kh.BackendCapstone.dto.request.PsWriteReqDto;
import kh.BackendCapstone.dto.response.PsWriteListResDto;
import kh.BackendCapstone.dto.response.PsWriteResDto;
import kh.BackendCapstone.service.PsWriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/write")
public class PsWriteController {
    private final PsWriteService psWriteService;

    @PostMapping("/save/{psWriteId}")
    public ResponseEntity<PsWriteResDto> savePsWrite(@RequestBody PsWriteDto psWriteDto, @PathVariable Long psWriteId, @RequestHeader("Authorization") String token) {
        try {
            // psWriteDto에서 PsWriteReqDto와 List<PsContentsReqDto> 추출
            PsWriteReqDto psWriteReqDto = psWriteDto.getPsWriteReqDto();
            psWriteReqDto.setPsWriteId(psWriteId);
            List<PsContentsReqDto> contentsReqDtoList = psWriteDto.getPsContentsReqDtoList();

            log.info("Received request to save PsWrite: {}", psWriteDto);

            // 서비스 호출
            PsWriteResDto psWriteResDto = psWriteService.savePsWrite(psWriteReqDto, contentsReqDtoList, token);
            return ResponseEntity.ok(psWriteResDto);
        } catch (Exception e) {
            log.error("Failed to save PsWrite", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/load/{psWriteId}")
    public ResponseEntity<PsWriteResDto> loadPsWrite(@PathVariable Long psWriteId, @RequestHeader("Authorization") String token) {
        PsWriteResDto psWriteResDto = psWriteService.loadPsWrite(psWriteId, token);
        return (psWriteResDto != null) ? ResponseEntity.ok(psWriteResDto) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
    @GetMapping("/make")
    public ResponseEntity<Long> makePsWrite(@RequestHeader("Authorization") String token) {
        Long psWriteId = psWriteService.newPsWrite(token);
        return ResponseEntity.ok(psWriteId);
    }

/*    // 작성한 자기소개서 리스트
    @GetMapping("/myPs/{memberId}")
    public ResponseEntity<List<PsWriteResDto>> getPsByMemberId(@PathVariable Long memberId) {
        log.info("Requested memberId : {}", memberId);
        // Service 호출하여 참여 중인 채팅방 리스트 반환
        List<PsWriteResDto> psWrites = psWriteService.getPsByMemberId(memberId);

        return ResponseEntity.ok(psWrites);
    }*/

    @GetMapping("/list/get")
    public ResponseEntity<List<PsWriteListResDto>> getPsWriteList(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(psWriteService.getPsWriteList(token));
    }

    // 자기소개서 삭제
    @DeleteMapping("del/{psWriteId}")
    public ResponseEntity<Boolean> deleteBoard(@PathVariable Long psWriteId) {
        boolean isSuccess = psWriteService.deletePs(psWriteId);
        return ResponseEntity.ok(isSuccess);
    }
}
