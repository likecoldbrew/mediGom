package kr.or.nextit.backend.model;

import lombok.Data;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class Community {
    private int boardId;
    private String title;
    private String content;
    private Timestamp createAt;
    private Timestamp updateAt;
    private int views;
    private int userNo;
    private String userId;
    private String status;
    private List<BoardFiles> files; // 첨부파일 정보
}