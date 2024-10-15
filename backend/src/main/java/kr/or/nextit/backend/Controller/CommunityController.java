package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.service.CommunityService;
import kr.or.nextit.backend.service.DoctorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    //전체 후기글
    @GetMapping("/all")
    public List<Community> getAllBoards() {
        return communityService.getAllBoardsWithUser();
    }
    //특정 후기글
    @GetMapping("/detail")
    public List<Community> selectBoard(int boardId) {
        return communityService.selectBoard(boardId);
    }
    //전체 공지사항
    @GetMapping("/allNotice")
    public List<Community> getAllNotices() {
        return communityService.getAllBoardsWithAdmin();
    }
    //특정 공지사항
    @GetMapping("/detailNotice")
    public List<Community> selectNotice(int boardId) {
        return communityService.selectNotice(boardId);
    }
    // 게시글 등록
    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<String> registerBoard(@RequestParam("title") String title,
                                                @RequestParam("content") String content,
                                                @RequestParam("userNo") int userNo,
                                                @RequestParam(value = "file", required = false) MultipartFile[] files) { // 배열로 변경
        // 게시글 데이터 처리
        Community boardDTO = new Community();
        boardDTO.setTitle(title);
        boardDTO.setContent(content);
        boardDTO.setUserNo(userNo);
        // 파일 처리 로직
        if (files != null && files.length > 0) {
            for (MultipartFile file : files) {
                // 각 파일을 처리하는 로직 추가
                // 예: communityService.saveFile(file, boardDTO.getBoardId());
            }
        }
        communityService.registerBoard(boardDTO);
        return ResponseEntity.ok("게시글이 등록되었습니다.");
    }


    // 게시글 업데이트
    @PutMapping("/update/{boardId}")
    public ResponseEntity<String> updateBoard(
            @PathVariable int boardId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("userId") String userId,
            @RequestParam(value = "files", required = false) MultipartFile[] files) {
        Community boardDTO = new Community();
        boardDTO.setBoardId(boardId);
        boardDTO.setTitle(title);
        boardDTO.setContent(content);
        boardDTO.setUserId(userId);

        // 첨부파일 처리 (업로드, DB에 저장 등)
        if (files != null &&  files.length > 0) {
            for (MultipartFile file : files) {
                // 파일 처리 로직
                // 예: 파일 저장, DB에 정보 추가 등
            }
        }
        communityService.updateBoard(boardDTO); // 게시글 업데이트 호출
        return ResponseEntity.ok("게시글이 업데이트되었습니다.");
    }
}
