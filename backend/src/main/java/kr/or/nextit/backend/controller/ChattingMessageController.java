package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.ChattingMessage;
import kr.or.nextit.backend.service.ChattingMessageService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/chatting")
public class ChattingMessageController {

    @Autowired
    private ChattingMessageService chattingMessageService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // SimpMessagingTemplate 추가

    // 특정 채팅방의 메시지를 가져오는 API
    @GetMapping("/messages/{chattingRoomId}")
    public List<ChattingMessage> getMessagesByChatRoomId(@PathVariable int chattingRoomId) {
        return chattingMessageService.getMessagesByChatRoomId(chattingRoomId);
    }

    // 새로운 메시지를 저장하는 API (REST API)
    @PostMapping("/messages")
    public ResponseEntity<ChattingMessage> saveMessage(@RequestBody ChattingMessage message) {
        message.setSendAt(new Date()); // 메시지 전송 시각 설정
        ChattingMessage savedMessage = chattingMessageService.insertChattingMessage(message);
        return ResponseEntity.ok(savedMessage);
    }

    // WebSocket을 통한 메시지 전송
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(ChattingMessage message) {
        message.setSendAt(new Date()); // 메시지 전송 시각 설정
        ChattingMessage savedMessage = chattingMessageService.insertChattingMessage(message);

        // 채팅방 ID에 따라 메시지를 전송
        messagingTemplate.convertAndSend("/topic/room/" + message.getChattingRoomId(), savedMessage);
    }

    // WebSocket을 통한 사용자 추가
    @MessageMapping("/chat.addUser")
    public ChattingMessage addUser(ChattingMessage message, SimpMessageHeaderAccessor headerAccessor) {
        // WebSocket 세션에 사용자 이름 저장
        headerAccessor.getSessionAttributes().put("username", message.getUserName());
        message.setSendAt(new Date()); // 메시지 전송 시각 설정
        return message;
    }
}
