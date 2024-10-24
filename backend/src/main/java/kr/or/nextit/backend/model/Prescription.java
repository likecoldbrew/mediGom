package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Prescription {
    @Id
    @GeneratedValue
    private int prescriptionId; // 처방 내역 id
    private Integer medicalRecordId; // 진료 내역 id
    private String medicationName; // 약물이름
    private String dosage; // 용량(용량 500mg, 1일 3회)
    private String frequency; // 복용 빈도(식후 1일 3회)
    private String duration; // 복용 기간(10일)
    private String instructions; // 복용지침
    private Timestamp createAt; // 처방일
    private Timestamp updateAt; // 수정일
    private String userName;    // 환자이름
    private String doctorName;  // 의사이름
    private String departmentName; //진료과
    private int userNo; //유저번호(필터용)
}
