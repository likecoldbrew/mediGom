package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "hospital_info")  // 테이블 이름을 명시
@Data
public class Hospital {
    @Id
    @GeneratedValue
    private String hospitalAdd;        // 병원주소
    private String huntingLine;    // 대표 번호
    private String businessRegistrationNumber;     // 사업자 번호
    private String reserveNumber;     // 예약전화번호
    private String reserveWeekTime;      //평일 예약 전화 가능시간
    private String reserveSatTime;      //주말 예약 전화 가능시간
    private String reserveHoliTime;      //공휴일 예약 전화 가능시간
    private String intro;      //병원소개
}
