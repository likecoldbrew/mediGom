package kr.or.nextit.backend.model;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Data
public class MedicalDepartment {
    @Id
    @GeneratedValue
    private int departmentNo;    // 진료과 ID
    private String departmentName; // 진료과 이름
}
