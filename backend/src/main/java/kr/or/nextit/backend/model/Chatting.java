package kr.or.nextit.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class Chatting {
    private int chattingNo;          // 채팅 번호
    private int chattingRoomId;      // 채팅방 ID
    private int userNo;              // 유저 번호
    private Date joinAt;                 // 방 들어간 시간
    private String leaveYn;              // 방 나감 여부 (y/n)


}
