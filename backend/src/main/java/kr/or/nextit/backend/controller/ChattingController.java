package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Chatting;
import kr.or.nextit.backend.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatting")
@RequiredArgsConstructor
public class ChattingController {
    private final ChattingService chattingService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.createRoom/{userNo}")
    public void addChatting(@DestinationVariable int userNo, Chatting chatting, SimpMessageHeaderAccessor headerAccessor) {
        // 세션에서 사용자 이름 가져오기 (필요한 경우)
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        chatting.setUserNo(userNo); // 현재 사용자의 ID 설정
        chatting.setUserName(username); // 현재 사용자의 이름 설정
        // 데이터베이스에 새로운 채팅 방 추가
        chattingService.insertChatting(chatting);

        // 새로운 채팅 방 정보를 모든 클라이언트에 브로드캐스트
        messagingTemplate.convertAndSend("/topic/chatRooms", chatting);
    }

    @GetMapping("/{chattingRoomId}")
    public ResponseEntity<List<Chatting>> getChattingByRoomId(@PathVariable int chattingRoomId) {
        List<Chatting> chatList = chattingService.selectChattingByRoomId(chattingRoomId);
        return ResponseEntity.ok(chatList);
    }

    @GetMapping("/user/{userNo}")
    public ResponseEntity<List<Chatting>> getAllChatting(@PathVariable int userNo) {
        List<Chatting> chatList = chattingService.selectAllChatting(userNo);
        return ResponseEntity.ok(chatList);
    }



}
