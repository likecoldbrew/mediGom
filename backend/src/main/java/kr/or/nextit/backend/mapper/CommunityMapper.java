package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.model.Community;
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
    int insertBoardFiles(List<Files> files);
    // 게시글의 첨부파일 조회
    List<Files> selectBoardFiles(int boardId);
    //게시글 삭제
    int deleteBoard(int boardId);
    //첨부파일삭제
    int deleteBoardFiles(int boardId);

    // 특정 게시글 조회와 첨부파일 포함
    default Community selectBoardWithFiles(int boardId) {
        Community board = selectBoard(boardId).get(0); // 게시글 정보 가져오기
        List<Files> files = selectBoardFiles(boardId); // 첨부파일 정보 가져오기
        board.setFiles(files); // 게시글에 첨부파일 추가
        return board; // 게시글과 첨부파일 정보를 포함한 Community 객체 반환
    }


}

