package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.MedicalRecordMapper;
import kr.or.nextit.backend.model.MedicalRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MedicalRecordService {
    private final MedicalRecordMapper medicalRecordMapper;


    // 의사 진단 목록 조회
    public List<MedicalRecord> getMedicalRecordList(int doctorNo) {
        return medicalRecordMapper.getMedicalRecordList(doctorNo);
    }

    // 환자 진단 목록 조회
    public List<MedicalRecord> getUserMedicalRecordList(int userNo) {
        return medicalRecordMapper.getUserMedicalRecordList(userNo);
    }
}
