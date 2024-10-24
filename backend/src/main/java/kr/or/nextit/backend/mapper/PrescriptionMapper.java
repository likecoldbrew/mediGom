package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Prescription;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PrescriptionMapper {
    // 의사 처방 목록 조회
    List<Prescription> getPrescriptionList(int doctorNo);

    // 환자 처방 목록 조회
    List<Prescription> getUserPrescriptionList(int userNo);

    // 특정 유저 처방 조회
    List<Prescription> selectPrescription(int userNo);

    // 특정 처방 상세 조회
    Prescription selectPrescriptionDetail(int prescriptionId);
}
