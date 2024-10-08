package kr.or.nextit.backend.model;

public class Department {
    private Long departmentNo;
    private String departmentName;

    // Getters and Setters
    public Long getDepartmentNo() {
        return departmentNo;
    }

    public void setDepartmentNo(Long departmentNo) {
        this.departmentNo = departmentNo;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
