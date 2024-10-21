package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.ChattingMessage;
import kr.or.nextit.backend.service.ChattingMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatting/messages")
@RequiredArgsConstructor
public class ChattingMessageController {
    private final ChattingMessageService chattingMessageService;

    @PostMapping
    public ResponseEntity<ChattingMessage> addChattingMessage(@RequestBody ChattingMessage chattingMessage) {
        chattingMessageService.insertChattingMessage(chattingMessage);
        return ResponseEntity.ok(chattingMessage);
    }

    @GetMapping("/{chattingRoomId}")
    public ResponseEntity<List<ChattingMessage>> getMessagesByRoomId(@PathVariable int chattingRoomId) {
        List<ChattingMessage> messages = chattingMessageService.getMessagesByRoomId(chattingRoomId);
        return ResponseEntity.ok(messages);
    }
}
