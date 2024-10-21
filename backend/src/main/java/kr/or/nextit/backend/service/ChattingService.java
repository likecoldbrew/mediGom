package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.ChattingMapper;
import kr.or.nextit.backend.model.Chatting;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ChattingService {
    private final ChattingMapper chattingMapper;

    public void insertChatting(Chatting chatting) {
        chattingMapper.insertChatting(chatting);
    }

    public List<Chatting> selectChattingByRoomId(int chattingRoomId) {
        return chattingMapper.selectChattingByRoomId(chattingRoomId);
    }

    public List<Chatting> selectAllChatting(int userNo) {
        return chattingMapper.selectAllChatting(userNo);
    }
}