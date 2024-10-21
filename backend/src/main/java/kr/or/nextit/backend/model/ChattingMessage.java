package kr.or.nextit.backend.model;

import lombok.Data;

import java.util.Date;

@Data
public class ChattingMessage {
    private int messageId;           // 메시지 ID
    private int chattingRoomId;      // 채팅방 ID
    private int sender;               // 보낸 사람 ID
    private String message;               // 메시지 내용
    private Date sendAt;
}
