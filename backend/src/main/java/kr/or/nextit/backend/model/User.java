package kr.or.nextit.backend.model;

import java.sql.Timestamp;

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

    @Column(nullable = false)
    private String userPass; // 비밀번호 (암호화 필요)

    @Column(nullable = false)
    private String userName;

    private String userRrn; // 주민등록번호
    private String email;
    private String phone;
    private String userAdd;
    private String userAdd2;

    private Timestamp createAt;
    private Timestamp updateAt;

    // admin: 0 = 환자, 1 = 의사, 2 = 관리자
    private int admin;

    private String deleteYn; // 삭제 여부 ('Y', 'N')

    @Transient //db에 없는 값이면 추가 필요
    private String departmentName; // 부서명 (의사일 경우)
    @Transient
    private String rank; // 직급 (의사일 경우)

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

}
