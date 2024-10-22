package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Reserve;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReserveMapper {

    // 의사 예약 목록
    List<Reserve> getReserveList(int doctorNo);

    // 환자 예약 목록
    List<Reserve> getUserReserveList(int userNo);

    // 예약 추가
    void insertReserve(Reserve reserve);

    // 모든 예약 조회
    List<Reserve> selectAllReserves();

    // ID로 특정 예약 조회
    Reserve selectReserveById(@Param("reserveId") int reserveId);

    // 예약 삭제
    void deleteReserve(@Param("reserveId") int reserveId);

    // 예약 상태 업데이트
    void updateReserveStatus(@Param("reserveId") int reserveId, @Param("status") int status);
}
