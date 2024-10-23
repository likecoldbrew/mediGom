package kr.or.nextit.backend.model;

import jakarta.persistence.Transient;
import lombok.Data;

import java.util.Date;

@Data
public class Chatting {
    private int chattingNo;          // 채팅 번호
    private int chattingRoomId;      // 채팅방 ID
    private int userNo;              // 유저 번호
    private Date joinAt;                 // 방 들어간 시간
    private String useYn;              // 방 나감 여부 (y/n)

    // 채팅방 인원 쉼표 기준 나열
    @Transient
    private String userNames;

    @Transient
    private String userName;

}
