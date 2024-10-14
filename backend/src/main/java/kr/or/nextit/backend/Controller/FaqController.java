package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.Faq;
import kr.or.nextit.backend.service.CommunityService;
import kr.or.nextit.backend.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    @GetMapping("/all")
    public List<Faq> getAllBoards() {
        return faqService.selectAllFaq();
    }

}
