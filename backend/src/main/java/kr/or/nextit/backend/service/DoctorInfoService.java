package kr.or.nextit.backend.service;


import kr.or.nextit.backend.mapper.CategoryMapper;
import kr.or.nextit.backend.mapper.DoctorInfoMapper;
import kr.or.nextit.backend.model.Category;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorInfoService {

    private final DoctorInfoMapper doctorInfoMapper;

    //전체 의사 조회
    public List<DoctorInfoDTO> getAllDoctors() {
        return doctorInfoMapper.getDoctors();
    }

    //전체 진료과 조회
    public List<DoctorInfoDTO> getAllDepartments() {
        return doctorInfoMapper.getDepartments();
    }

    //의사 검색
    public List<DoctorInfoDTO> searchDoctors(String searchTerm) {
        return doctorInfoMapper.searchDoctors(searchTerm);
    }

    // 진료과 검색
    public List<DoctorInfoDTO> searchDepartment(String departmentName) {
        return doctorInfoMapper.searchDepartment(departmentName);
    }

    // 의사 경력 조회
    public List<DoctorInfoDTO> getDoctorCareer(int userNo) {
        return doctorInfoMapper.getDoctorCareer(userNo);
    }

    // 의사 학력 조회
    public List<DoctorInfoDTO> getDoctorEducation(int userNo) {
        return doctorInfoMapper.getDoctorEducation(userNo);
    }
}
