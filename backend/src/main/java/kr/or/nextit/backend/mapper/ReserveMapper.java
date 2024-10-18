package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Reserve;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReserveMapper {

    // 예약 추가
    void insertReserve(Reserve reserve);

    // 모든 예약 조회
    List<Reserve> selectAllReserves();

    // ID로 특정 예약 조회
    Reserve selectReserveById(@Param("reserveId") int reserveId);

    // 예약 삭제
    void deleteReserve(@Param("reserveId") int reserveId);
}
