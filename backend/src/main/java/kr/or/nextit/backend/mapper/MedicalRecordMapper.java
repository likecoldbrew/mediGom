package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Mapper
public interface MedicalRecordMapper {
    // 예약 목록
    List<MedicalRecord> getMedicalRecordList(int doctorNo);

    // 환자 전체 목록(+진료의 etc)
    List<MedicalRecord> getAllPatientList();

    // 업데이트된 레코드를 조회하는 메서드
    MedicalRecord getMedicalRecordById(int recordId);


    void insertPatient(MedicalRecord medicalRecord);

    void updatePatient(MedicalRecord medicalRecord);

    void updateMedicalRecord(int recordId, MedicalRecord updatedRecord);
}
