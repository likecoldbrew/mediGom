package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Reserve;
import kr.or.nextit.backend.service.ReserveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reserves")
public class ReserveController {

    @Autowired
    private ReserveService reserveService;

    // 새로운 예약 추가
    @PostMapping
    public ResponseEntity<Void> createReserve(@RequestBody Reserve reserve) {
        reserveService.saveReserve(reserve);
        return ResponseEntity.ok().build();
    }

    // 모든 예약 조회
    @GetMapping
    public ResponseEntity<List<Reserve>> getAllReserves() {
        List<Reserve> reserves = reserveService.getAllReserves();
        return ResponseEntity.ok(reserves);
    }

    // ID로 특정 예약 조회
    @GetMapping("/{id}")
    public ResponseEntity<Reserve> getReserveById(@PathVariable int id) {
        Reserve reserve = reserveService.getReserveById(id);
        return ResponseEntity.ok(reserve);
    }

    // 예약 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserve(@PathVariable int id) {
        reserveService.deleteReserve(id);
        return ResponseEntity.noContent().build();
    }
}
