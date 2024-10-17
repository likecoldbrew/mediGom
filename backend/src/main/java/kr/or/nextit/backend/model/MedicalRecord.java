package kr.or.nextit.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class MedicalRecord {
    @Id
    @GeneratedValue
    private int recordId;
    private int userNo;
    private int doctorNo;
    private Timestamp visitDate;
    private String userName;
    private String diagnosis;
    private String treatment;
    private String departmentName;
    private String prescription;
    private String notes;
    private Timestamp createAt;
    private Timestamp updateAt;
}
