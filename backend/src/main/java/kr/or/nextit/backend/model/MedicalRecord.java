package kr.or.nextit.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Data
public class MedicalRecord {
    @Id
    @GeneratedValue
    private int recordId;
    private int userNo;
    private int doctorNo;
    private Timestamp visitAt;
    private String diagnosis;
    private String treatment;
    private String prescription;
    private String notes;
    private Timestamp createAt;
    private Timestamp updateAt;
    private String userName;    // 환자이름
    private String doctorName;  // 의사이름
    private String departmentName; //진료과
}
