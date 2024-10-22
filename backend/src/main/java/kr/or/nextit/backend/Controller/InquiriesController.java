package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Inquiries;
import kr.or.nextit.backend.service.InquiriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiriesController {
    private final InquiriesService inquiriesService;

    // 문의사항 전체 조회
    @GetMapping("/all")
    public List<Inquiries> allInquiries() {
        return inquiriesService.allInquiries();
    }

    // 특정 문의글 조회
    @GetMapping("/detail")
    public Inquiries selectInquiry(int inquirieId) {
        return inquiriesService.selectInquiry(inquirieId);
    }

    // 문의사항 등록
    @PostMapping("/register")
    public ResponseEntity<Void> createInquiry(@RequestParam("userNo") int userNo,
                                              @RequestParam String type,
                                              @RequestParam String title,
                                              @RequestParam String content) {
        Inquiries inquiries = new Inquiries();
        inquiries.setUserNo(userNo);
        inquiries.setType(type);
        inquiries.setTitle(title);
        inquiries.setContent(content);
        inquiriesService.createInquiry(inquiries);
        return new ResponseEntity<>(HttpStatus.CREATED); // 생성 성공
    }

    // 관리자 - 문의사항 답변 등록 (수정)
    @PutMapping("/update/{inquirieId}")
    public ResponseEntity<Void> updateAdminInquiry(@PathVariable("inquirieId") int inquirieId,
                                                   @RequestParam("answer") String answer) {
        Inquiries inquiries = inquiriesService.selectInquiry(inquirieId);

        if (inquiries == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found 응답
        }

        inquiries.setAnswer(answer);

        inquiriesService.updateAdminInquiry(inquiries);

        return new ResponseEntity<>(HttpStatus.OK); // 200 OK 응답
    }

    // 회원 - 문의사항 삭제
    @DeleteMapping("/delete/user/{inquirieId}")
    public ResponseEntity<Void> deleteUserInquiry(@PathVariable int inquirieId) {
        // ID로 FAQ 항목을 데이터베이스에서 조회
        Inquiries inquiries = inquiriesService.selectInquiry(inquirieId);

        // 해당 ID로 FAQ 항목이 존재하지 않을 경우
        if (inquiries == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found 응답
        }

        // FAQ 항목 삭제
        inquiriesService.deleteUserInquiry(inquirieId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content 응답
    }

    // 관리자 - 문의사항 삭제 (답변 초기화)
    @DeleteMapping("/delete/admin/{inquirieId}")
    public ResponseEntity<Void> deleteAdminInquiry(@PathVariable int inquirieId) {
        Inquiries inquiries = inquiriesService.selectInquiry(inquirieId);

        if (inquiries == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found 응답
        }

        inquiriesService.deleteAdminInquiry(inquirieId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content 응답
    }
}
