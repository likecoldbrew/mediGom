package kr.or.nextit.backend.model;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")  // 테이블 이름을 명시
@Data
public class Doctor {
    @Id
    @GeneratedValue
    private Long doctorNo;        // 의사 ID
    private Long doctorUserNo;    // 의사 사용자 ID (users 테이블과 연결)
    private String department;     // 진료과 ID (medical_department 테이블과 연결)
    private String treatment;      // 진료 분야 (comma-separated)
}
