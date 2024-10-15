package kr.or.nextit.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import java.sql.Timestamp;


@Entity
@Data
public class Inquiries {
    @Id
    @GeneratedValue
  private int inquirieId;
  private int userNo;
  private String type;
  private String title;
  private String content;
  private Timestamp createdAt;
  private String status;
  private String text;
}