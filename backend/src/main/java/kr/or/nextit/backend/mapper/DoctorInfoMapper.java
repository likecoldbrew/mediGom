package kr.or.nextit.backend.mapper;


import kr.or.nextit.backend.model.DoctorInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DoctorInfoMapper {
    List<DoctorInfoDTO> getDoctors();  // 최상위 카테고리 조회
    List<DoctorInfoDTO> getDepartments();  // 전체 진료과 조회
    List<DoctorInfoDTO> searchDoctors(String searchTerm); //이름으로 의사 조회
    List<DoctorInfoDTO> searchDepartment(String departmentName); // 진료과 이름으로 의사 조회
}

