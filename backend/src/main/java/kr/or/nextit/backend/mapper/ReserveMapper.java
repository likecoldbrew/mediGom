package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Reserve;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReserveMapper {
    // 의사 예약 목록
    List<Reserve> getReserveList(int doctorNo);

    // 환자 예약 목록
    List<Reserve> getUserReserveList(int userNo);
}
