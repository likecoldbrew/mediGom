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

    // 로그인 유저 진단 목록 조회
    public List<MedicalRecord> loginUserMedicalRecord(int userNo) {
        return medicalRecordMapper.loginUserMedicalRecord(userNo);
    }

    //특정 기록 조회
    public MedicalRecord selectMedicalRecord(int recordId) {
            return medicalRecordMapper.selectMedicalRecord(recordId);
    }



}
