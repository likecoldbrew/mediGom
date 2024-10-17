package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 자동 생성
    private int certificateId; // 증명서 id

    private int userNo; // 유저 정보
    private int doctorNo; // 의사 정보

    private int certificateType; // 타입 (1 진단, 2 소견, 3 입퇴원)

    private String disease; // 병명

    private String content; // 내용

    private Date outbreakAt; // 발병일

    private Date treatmentAt; // 진료일

    private Date createAt; // 증명서 발급일

    private Date validUntil; // 유효기간

    private int status; // 상태 (0: 발급 대기, 1: 발급 완료)

    // 추가적인 메서드나 비즈니스 로직은 여기에 추가 가능합니다.
}
