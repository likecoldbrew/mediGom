package kr.or.nextit.backend.model;

import java.sql.Timestamp;
import java.time.Instant;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // ID 자동 생성
    private int userNo;

    @Column(unique = true, nullable = false) // 아이디는 유일해야 함
    private String userId;


    private String userPass; // 비밀번호 (암호화 필요)

    @Column(nullable = false)
    private String userName;

    private String userRrn; // 주민등록번호
    private String email;
    private String phone;
    private String userAdd;
    private String userAdd2;

    @Transient
    private String  newPassword;

    @Column(nullable = false, updatable = false)
    private Timestamp createAt; // 생성일자

    private Timestamp updateAt; // 수정일자

    // admin: 0 = 환자, 1 = 의사, 2 = 관리자
    private int admin;

    @Column(length = 1, nullable = false)
    private String deleteYn; // 삭제 여부 ('Y', 'N')

    @Transient // DB에 저장되지 않는 필드
    private String departmentName; // 부서명 (의사일 경우)

    @Transient
    private String rank; // 직급 (의사일 경우)

    // 역할(Role) 가져오기
    public String getRole() {
        switch (admin) {
            case 0:
                return "PATIENT";
            case 1:
                return "DOCTOR";
            case 2:
                return "ADMIN";
            default:
                return "UNKNOWN";
        }
    }

    // 엔티티가 처음 저장되기 전 실행되는 메서드
    @PrePersist
    protected void onCreate() {
        this.createAt = Timestamp.from(Instant.now()); // 현재 시간 설정
        this.deleteYn = "N"; // 기본값 'N' 설정
    }

    // 엔티티가 업데이트될 때 호출되는 메서드
    @PreUpdate
    protected void onUpdate() {
        this.updateAt = Timestamp.from(Instant.now()); // 수정 시간 갱신
    }
}
