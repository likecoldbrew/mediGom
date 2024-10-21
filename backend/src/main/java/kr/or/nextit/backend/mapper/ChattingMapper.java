package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Chatting;

import java.util.List;

public interface ChattingMapper {
    int insertChatting(Chatting chatting);
    List<Chatting> selectChattingByRoomId(int chattingRoomId);
    List<Chatting> selectAllChatting(int userNo);
}
