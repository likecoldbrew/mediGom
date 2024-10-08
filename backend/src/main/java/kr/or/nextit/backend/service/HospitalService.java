package kr.or.nextit.backend.service;
import kr.or.nextit.backend.mapper.HospitalMapper;
import kr.or.nextit.backend.model.Hospital;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalMapper HospitalMapper;
    //전체 의사 조회
    public List<Hospital> getHospitalInfo() {
        return HospitalMapper.getHospitalInfo();
    }
}

