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
    //병원후기글 전체 조회
    public List<Community> getAllBoardsWithUser() {
        return communityMapper.selectAllBoardsWithUser();
    }
    //공지사항글 전체 조회
    public List<Community> getAllBoardsWithAdmin() {
        return communityMapper.selectAllBoardsWithAdmin();
    }
    //병원후기글 하나 선택
    public List<Community> selectBoard(int boardId) {
        return communityMapper.selectBoard(boardId);
    }
    //공지사항 하나 선택
    public List<Community> selectNotice(int boardId) {
        return communityMapper.selectNotice(boardId);
    }
    // 게시글 업데이트 호출
    public void updateBoard(Community community) {
        communityMapper.updateBoard(community);
    }
    public List<BoardFiles> getBoardFiles(int boardId) {
        return communityMapper.selectBoardFiles(boardId); // 첨부파일 조회 호출
    }
    //게시글 등록(첨부파일 트랜잭션)
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
