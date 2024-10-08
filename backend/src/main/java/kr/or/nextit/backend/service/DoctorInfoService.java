package kr.or.nextit.backend.service;


import kr.or.nextit.backend.mapper.CategoryMapper;
import kr.or.nextit.backend.mapper.DoctorInfoMapper;
import kr.or.nextit.backend.model.Category;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorInfoService {

    private final DoctorInfoMapper doctorInfoMapper;

    public List<DoctorInfoDTO> getAllDoctors() {
        return doctorInfoMapper.getDoctors();
    }

}
