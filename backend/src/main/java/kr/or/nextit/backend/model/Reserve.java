package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.sql.Date;

@Entity
@Data
public class Reserve {
    @Id
    @GeneratedValue
    private int reserveId; // 진료 예약 id
    private Integer userNo; // 환자 id
    private Integer doctorNo; // 의사 id
    private String medicalDepartment; // 진료과 코드
    private Date reserveTime; // 예약일
    private String symptom; // 증상
    private int status; // 대기중, 승인완료
    private String userName; // 환자 이름
    private String doctorName;  // 의사 이름
}
