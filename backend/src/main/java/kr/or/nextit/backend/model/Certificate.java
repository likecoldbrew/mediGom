package kr.or.nextit.backend.model;

import java.sql.Date;

public class Certificate {
    public String patientName;
    public String doctorName;
    public Long departmentNo;
    public String certificateType;
    public String issueDate;
    public String details;

    public Certificate(String patientName, String doctorName, Long departmentNo, String certificateType, Date date, String details) {
    }
}
