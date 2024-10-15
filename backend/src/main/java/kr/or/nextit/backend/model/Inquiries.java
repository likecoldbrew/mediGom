package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import java.sql.Timestamp;

@Data
public class Inquiries {
  private int inquirieId;
  private int userNo;
  private String type;
  private String title;
  private String content;
  private Timestamp createAt;
  private String status;
  private String answer;
  private String userId;
}