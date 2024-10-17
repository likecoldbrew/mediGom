package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.model.Community;
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
    public Community selectBoard(int boardId) {
        return communityMapper.selectBoardWithFiles(boardId);
    }

    //공지사항 하나 선택
    public List<Community> selectNotice(int boardId) {
        return communityMapper.selectNotice(boardId);
    }
    //게시글 등록(첨부파일 트랜잭션)
    @Transactional
    public int registerBoard(Community boardDTO) {
        int retValue = communityMapper.insertBoard(boardDTO);
        if (boardDTO.getFiles() != null && !boardDTO.getFiles().isEmpty()) {
            int boardId = boardDTO.getBoardId(); // 방금 등록한 게시글 ID
            List<Files> fileList = boardDTO.getFiles();
            for (Files file : fileList) {
                file.setBoardId(boardId); // 파일의 board_id 설정
            }
            communityMapper.insertBoardFiles(fileList); // 리스트 전체를 한 번에 삽입
        }
        return retValue;
    }

    // 게시글 업데이트
    public int updateBoard(Community board) {
        int result=communityMapper.updateBoard(board);
        if(result>0) {
            int boardId = board.getBoardId();
            communityMapper.deleteBoardFiles(boardId);
            List<Files> fileList=board.getFiles();
            if (fileList != null && !fileList.isEmpty()) {
                for (Files file : fileList) {
                    file.setBoardId(boardId); //boardId가 BoardNo가 됨
                }
                return communityMapper.insertBoardFiles(fileList);
            }
            return result;
        }
        return 0;
    }

    //게시글 삭제
    public int deleteBoard(int boardId) {
        return communityMapper.deleteBoard(boardId);
    }

    //첨부파일 조회
    public List<Files> getBoardFiles(int boardId) {
        return communityMapper.selectBoardFiles(boardId); // 첨부파일 조회 호출
    }

}
