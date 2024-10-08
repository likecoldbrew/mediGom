package kr.or.nextit.backend.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class DoctorInfoDTO {
    private String userName;        // 의사 이름
    private String departmentName;  // 진료과 이름
    private List<String> treatments; // 진료 분야 리스트

    public void setTreatments(String treatments) {
        if (treatments != null) {
            this.treatments = Arrays.asList(treatments.split(","));
        } else {
            this.treatments = new ArrayList<>();
        }
    }
}