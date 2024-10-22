package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.ReserveMapper;
import kr.or.nextit.backend.model.Reserve;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReserveService {

    @Autowired
    private ReserveMapper reserveMapper;

    // 의사 예약 목록 조회
    public List<Reserve> getReserveList(int doctorNo) {
        return reserveMapper.getReserveList(doctorNo);
    }

    // 환자 예약 목록 조회
    public List<Reserve> getUserReserveList(int userNo) {
        return reserveMapper.getUserReserveList(userNo);
    }

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

    public void updateReserveStatus(@Param("reserveId") int reserveId, @Param("status") int status) {
        // 예외 처리를 추가하여 해당 예약이 존재하는지 확인 후 업데이트
        reserveMapper.updateReserveStatus(reserveId, status);
    }

}
