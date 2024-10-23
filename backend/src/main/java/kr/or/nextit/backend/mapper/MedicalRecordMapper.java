package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.MedicalRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedicalRecordMapper {
    // 의사 진단 목록 조회
    List<MedicalRecord> getMedicalRecordList(int doctorNo);

    // 환자 진단 목록 조회
    List<MedicalRecord> getUserMedicalRecordList(int userNo);

}
