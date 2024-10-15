package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.mapper.DoctorInfoMapper;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityMapper communityMapper;


    public List<Community> getAllBoardsWithUser() {
        return communityMapper.selectAllBoardsWithUser();
    }

    public List<Community> selectBoard(int boardId) {
        return communityMapper.selectBoard(boardId);
    }
    public void updateBoard(Community community) {
        communityMapper.updateBoard(community); // 게시글 업데이트 호출
    }

    public List<BoardFiles> getBoardFiles(int boardId) {
        return communityMapper.selectBoardFiles(boardId); // 첨부파일 조회 호출
    }

    @Transactional
    public void registerBoard(Community boardDTO) {
        communityMapper.insertBoard(boardDTO);
        int boardId = boardDTO.getBoardId(); // 방금 등록한 게시글 ID

        if (boardDTO.getFiles() != null) {
            for (BoardFiles file : boardDTO.getFiles()) {
                file.setBoardId(boardId); // 파일의 board_id 설정
                communityMapper.insertBoardFiles(file);
            }
        }
    }
}
