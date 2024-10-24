package kr.or.nextit.backend.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Transient;
import lombok.Data;

import java.util.*;

@Data
public class Chatting {
    private int chattingNo;          // 채팅 번호
    private int chattingRoomId;      // 채팅방 ID
    private int inviteUserNo;         //초대한 사람 번호
    private int userNo;              // 유저 번호
    private Date joinAt;                 // 방 들어간 시간
    private String useYn;              // 방 나감 여부 (y/n)

    @ElementCollection // 여러 사용자를 저장할 수 있도록 설정
    private List<Integer> userNos;

    // 채팅방 인원 쉼표 기준 나열
    @Transient
    private String userNames;

    @Transient
    private String userName;

    @Transient
    private String lastMessage;

}
