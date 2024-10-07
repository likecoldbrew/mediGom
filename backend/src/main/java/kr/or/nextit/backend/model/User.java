package kr.or.nextit.backend.model;

import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "users")  // 테이블 이름을 명시
@Data
public class User {
    @Id
    @GeneratedValue
    private int userNo;
    private String userId;
    private String userPass;
    private String userName;
    private String userRrn;
    private String email;
    private String phone;
    private String userAdd;
    private String userAdd2;
    private Timestamp createAt;
    private Timestamp updateAt;
    private int admin;
    private String deleteYn;
}
