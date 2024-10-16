package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.MedicalRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MedicalRecordMapper {
    // 예약 목록
    List<MedicalRecord> getMedicalRecordList(int doctorNo);
}
