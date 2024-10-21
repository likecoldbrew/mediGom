package kr.or.nextit.backend.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class Faq {
    private int faqId;
    private String title;
    private String content;
    private String status;
}