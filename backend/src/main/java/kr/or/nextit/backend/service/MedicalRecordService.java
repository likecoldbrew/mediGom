package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.MedicalRecordMapper;
import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MedicalRecordService {
    private final MedicalRecordMapper medicalRecordMapper;

    // 목록 조회
    public List<MedicalRecord> getMedicalRecordList(int doctorNo) {
        return medicalRecordMapper.getMedicalRecordList(doctorNo);
    }

    public List<MedicalRecord> getAllPatientList() {
        return medicalRecordMapper.getAllPatientList();
    }

    public void addMedicalRecord(MedicalRecord medicalRecord) {
        medicalRecordMapper.insertPatient(medicalRecord);
    }

    // 환자 진료 정보 수정 메서드
    public void updateMedicalRecord(MedicalRecord medicalRecord) {
        medicalRecordMapper.updatePatient(medicalRecord);
    }

    public void updateMedicalRecord(int recordId, MedicalRecord updatedRecord) {
        medicalRecordMapper.updateMedicalRecord(recordId, updatedRecord);
    }
}
