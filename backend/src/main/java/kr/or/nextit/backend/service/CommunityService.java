package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.mapper.FilesMapper;
import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.model.Community;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {
    private final CommunityMapper communityMapper;
    private final FilesMapper filesMapper;
    private final FilesService filesService;

    //병원후기글 전체 조회
    public List<Community> getAllBoardsWithUser() {
        return communityMapper.selectAllBoardsWithUser();
    }

    //공지사항글 전체 조회
    public List<Community> getAllBoardsWithAdmin() {
        return communityMapper.selectAllBoardsWithAdmin();
    }


    // 특정 게시글 조회와 첨부파일 포함
    public Community selectBoard(int boardId) {
        Community board = communityMapper.selectBoard(boardId).get(0); // 게시글 정보 가져오기
        List<Files> files = filesMapper.selectAllFiles(boardId); // 첨부파일 정보 가져오기
        board.setFiles(files); // 게시글에 첨부파일 추가
        return board; // 게시글과 첨부파일 정보를 포함한 Community 객체 반환
    }


    //공지사항 하나 선택
    public List<Community> selectNotice(int boardId) {
        return communityMapper.selectNotice(boardId);
    }


    public int registerBoard(Community boardDTO) {
        int retValue = communityMapper.insertBoard(boardDTO);
        if (boardDTO.getFiles() != null && !boardDTO.getFiles().isEmpty()) {
            int boardId = boardDTO.getBoardId(); // 방금 등록한 게시글 ID
            List<Files> fileList = boardDTO.getFiles();
            for (Files file : fileList) {
                file.setBoardId(boardId); // 파일의 board_id 설정
            }
            filesService.saveFiles(fileList); // 리스트 전체를 한 번에 삽입
        }
        return retValue;
    }

    // 게시글 업데이트
    @Transactional
    public int updateBoard(Community board, List<Integer> deletedFileIds) {
        int result=communityMapper.updateBoard(board);
        if(result>0) {
            int boardId = board.getBoardId();
            // 삭제할 파일 처리
            if (deletedFileIds != null && !deletedFileIds.isEmpty()) {
                filesMapper.deleteFiles(deletedFileIds); // 삭제할 파일 IDs로 DB에서 삭제
            }
            List<Files> fileList=board.getFiles();
            if (fileList != null && !fileList.isEmpty()) {
                for (Files file : fileList) {
                    file.setBoardId(boardId); //boardId가 BoardNo가 됨
                }
                filesService.saveFiles(fileList);
            }
            return result;
        }
        return 0;
    }

    //게시글 삭제
    public int deleteBoard(int boardId) {
        return communityMapper.deleteBoard(boardId);
    }


}
