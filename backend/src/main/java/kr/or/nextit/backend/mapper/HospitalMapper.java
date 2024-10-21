package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Hospital;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface HospitalMapper {
    Hospital getHospitalInfo();  // 최상위 카테고리 조회

}

