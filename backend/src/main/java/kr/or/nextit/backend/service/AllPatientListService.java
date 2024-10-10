package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.AllPatientListMapper;
import kr.or.nextit.backend.model.AllPatientList;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AllPatientListService {

    @Autowired
    private AllPatientListMapper allPatientListMapper;

//    public List<AllPatientList> getAllPatientList(int userNo) {
////        return allPatientListMapper.selectMedicalData(userNo);
//    }
}

