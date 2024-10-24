package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
public class Hospital {
    @Id
    @GeneratedValue
    private String hospitalNameKr;        // 병원 한글이름
    private String hospitalNameEn;        // 병원 영어이름
    private String hospitalAdd;        // 병원주소
    private String huntingLine;    // 대표 번호
    private String businessRegistrationNumber;     // 사업자 번호
    private String reserveNumber;     // 예약전화번호
    private String reserveTime;      // 예약 가능 시간
    private String clinicTime;      // 병원 시간
    private String intro;      //병원소개
}
