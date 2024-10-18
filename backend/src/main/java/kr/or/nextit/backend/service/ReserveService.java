package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.ReserveMapper;
import kr.or.nextit.backend.model.Reserve;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReserveService {

    @Autowired
    private ReserveMapper reserveMapper;

    // 예약 추가
    public void saveReserve(Reserve reserve) {
        reserveMapper.insertReserve(reserve);
    }

    // 모든 예약 조회
    public List<Reserve> getAllReserves() {
        return reserveMapper.selectAllReserves();
    }

    // ID로 특정 예약 조회
    public Reserve getReserveById(int id) {
        return reserveMapper.selectReserveById(id);
    }

    // 예약 삭제
    public void deleteReserve(int id) {
        reserveMapper.deleteReserve(id);
    }
}
