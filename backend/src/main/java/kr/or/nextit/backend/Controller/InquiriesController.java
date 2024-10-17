package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Inquiries;
import kr.or.nextit.backend.service.InquiriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiriesController {
    private final InquiriesService inquiriesService;
    //전체 문의사항
    @GetMapping("/all")
    public List<Inquiries> getAllBoards() {
        return inquiriesService.allInquiries();
    }
    //특정 문의글
    @GetMapping("/detail")
    public List<Inquiries> selectInquiries(int inquirieId) {
        return inquiriesService.selectInquiries(inquirieId);
    }
}
