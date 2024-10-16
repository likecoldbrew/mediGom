package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardFilesMapper {
    //게시글 전체 조회
    List<Community> selectAllBoardsWithUser();
    //공지사항 전체 조회
    List<Community> selectAllBoardsWithAdmin();
    //특정 게시글 조회
    List<Community> selectBoard(int boardId);
    //특정 공지사항 조회
    List<Community> selectNotice(int boardId);
    // 게시글 등록
    void insertBoard(Community boardDTO);
    // 첨부파일 삽입
    void insertBoardFiles(BoardFiles boardFilesDTO);
    void updateBoard(Community boardDTO); // 게시글 업데이트
    List<BoardFiles> selectBoardFiles(int boardId); // 게시글의 첨부파일 조회
}

