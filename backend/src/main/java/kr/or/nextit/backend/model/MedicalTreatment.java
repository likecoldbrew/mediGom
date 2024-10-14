package kr.or.nextit.backend.model;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Data
public class MedicalTreatment {
    @Id
    @GeneratedValue
    private int treatmentNo;      // 진료 분야 ID
    private String treatmentName;   // 진료 분야 이름
}
