package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {
    //게시글 전체 조회
    List<Community> selectAllBoardsWithUser();
    //공지사항 전체 조회
    List<Community> selectAllBoardsWithAdmin();
    //특정 게시글 조회
    List<Community> selectBoard(int boardId);
    //특정 공지사항 조회
    List<Community> selectNotice(int boardId);
    // 게시글 등록
    int insertBoard(Community boardDTO);
    // 게시글 수정
    int updateBoard(Community boardDTO);
    //조회수
    void updateViews(int boardId);
    // 첨부파일 삽입
    int insertBoardFiles(List<BoardFiles> boardFiles);
    // 게시글의 첨부파일 조회
    List<BoardFiles> selectBoardFiles(int boardId);
    //게시글 삭제
    int deleteBoard(int boardId);
    //첨부파일삭제
    int deleteBoardFiles(int boardId);
}

