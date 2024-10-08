package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Category;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DoctorInfoMapper {
    List<DoctorInfoDTO> getDoctors();  // 최상위 카테고리 조회

}

