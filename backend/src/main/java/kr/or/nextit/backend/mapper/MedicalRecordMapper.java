package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.MedicalRecord;
import kr.or.nextit.backend.model.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedicalRecordMapper {
    // 예약 목록
    List<MedicalRecord> getMedicalRecordList(int doctorNo);
    // 환자 전체 목록(+진료의 etc)
    List<MedicalRecord> getAllPatientList();
}
