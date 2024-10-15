package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.Faq;
import kr.or.nextit.backend.service.CommunityService;
import kr.or.nextit.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @GetMapping("/all")
    public List<Faq> selectAllFaq() {
        return faqService.selectAllFaq();
    }

    @GetMapping("/detail")
    public List<Faq> selectFaq(int faqId) {
        return faqService.selectFaq(faqId);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> createFaq(@RequestParam String title,
                                          @RequestParam String content) {
        Faq faq = new Faq(); // Faq 객체 생성
        faq.setQuestion(title);
        faq.setAnswer(content);
        faqService.insertFaq(faq);
        return new ResponseEntity<>(HttpStatus.CREATED); // 생성 성공
    }


}
