package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Reserve;
import kr.or.nextit.backend.service.ReserveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reserve")
@RequiredArgsConstructor
public class ReserveController {
    private final ReserveService reserveService;

    // 의사 예약 목록 조회
    @GetMapping("/{doctorNo}")
    public List<Reserve> getReserveList(@PathVariable("doctorNo") int doctorNo) {
        return reserveService.getReserveList(doctorNo);
    }

    // 환자 예약 목록 조회
    @GetMapping("/user")
    public List<Reserve> getUserReserveList(int userNo) {
        return reserveService.getUserReserveList(userNo);
    }
}
