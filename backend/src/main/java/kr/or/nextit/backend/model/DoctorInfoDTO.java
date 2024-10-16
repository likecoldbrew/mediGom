package kr.or.nextit.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class DoctorInfoDTO {
    private String userName;        // 의사 이름
    private List<String> userNames; // 의사 이름 리스트
    private String departmentName;  // 진료과 이름
    private List<String> treatments; // 진료 분야 리스트
    private String careerInfo;      // 경력
    private String careerDate;      // 경력 날짜
    private String educationBackground;       // 학력
    private String educationDate;   // 학력 취득일

    public void setTreatments(String treatments) {
        if (treatments != null) {
            this.treatments = Arrays.asList(treatments.split(","));
        } else {
            this.treatments = new ArrayList<>();
        }
    }
    public void setUserNames(String userNames) {
        if (userNames != null) {
            this.userNames = Arrays.asList(userNames.split(","));
        } else {
            this.userNames = new ArrayList<>();
        }
    }
}