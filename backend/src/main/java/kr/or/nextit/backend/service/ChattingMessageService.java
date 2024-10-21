package kr.or.nextit.backend.service;

import kr.or.nextit.backend.mapper.ChattingMessageMapper;
import kr.or.nextit.backend.model.ChattingMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChattingMessageService {

    private final ChattingMessageMapper chattingMessageMapper;

    public void insertChattingMessage(ChattingMessage chattingMessage) {
        chattingMessageMapper.insertChattingMessage(chattingMessage);
    }

    public List<ChattingMessage> getMessagesByRoomId(int chattingRoomId) {
        return chattingMessageMapper.selectMessagesByRoomId(chattingRoomId);
    }
}
