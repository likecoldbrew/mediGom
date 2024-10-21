package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Chatting;
import kr.or.nextit.backend.service.ChattingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatting")
@RequiredArgsConstructor
public class ChattingController {
    private final ChattingService chattingService;

    @PostMapping
    public ResponseEntity<Chatting> addChatting(@RequestBody Chatting chatting) {
        chattingService.insertChatting(chatting);
        return ResponseEntity.ok(chatting);
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
