package kr.or.nextit.backend.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class Faq {
    private int faqId;
    private String question;
    private String answer;
    private String status;
}