package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.ReserveMapper;
import kr.or.nextit.backend.model.Reserve;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReserveService {
    private final ReserveMapper reserveMapper;

    // 의사 예약 목록 조회
    public List<Reserve> getReserveList(int doctorNo) {
        return reserveMapper.getReserveList(doctorNo);
    }

    // 환자 예약 목록 조회
    public List<Reserve> getUserReserveList(int userNo) {
        return reserveMapper.getUserReserveList(userNo);
    }
}
