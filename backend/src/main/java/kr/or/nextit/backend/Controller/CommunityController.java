package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.model.FileStorage;
import kr.or.nextit.backend.service.CommunityService;
import kr.or.nextit.backend.service.DoctorInfoService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final FileStorage fileStorage; // FileStorage 주입

    public String getUploadDir() {
        return fileStorage.getUploadDir(); // 메소드로 접근
    }
    //전체 후기글
    @GetMapping("/all")
    public List<Community> getAllBoards() {
        return communityService.getAllBoardsWithUser();
    }
    //특정 후기글
    @GetMapping("/detail")
    public Community selectBoard(@RequestParam int boardId) {
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
        List<BoardFiles> boardFilesList = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String fileName = file.getOriginalFilename();
                    String uploadDir = getUploadDir();
                    String filePath = uploadDir + "/" + fileName;

                    try {
                        // 파일을 서버에 저장
                        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("파일 업로드 중 오류가 발생했습니다." + e.getMessage());
                    }

                    BoardFiles boardFiles = new BoardFiles();
                    boardFiles.setFileName(fileName);
                    boardFiles.setFileOriginalName(fileName);
                    boardFiles.setFilePath(filePath);
                    boardFiles.setFileSize((int) file.getSize());
                    boardFiles.setFileType(file.getContentType());
                    boardFilesList.add(boardFiles);
                }
            }
            boardDTO.setFiles(boardFilesList);
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
        List<BoardFiles> boardFilesList = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String filePath = getUploadDir() + "/" + file.getOriginalFilename(); // 업로드 경로 설정
                    BoardFiles boardFiles = new BoardFiles();
                    boardFiles.setFileName(file.getOriginalFilename());
                    boardFiles.setFileOriginalName(file.getOriginalFilename());
                    boardFiles.setFilePath(filePath);
                    boardFiles.setFileSize((int) file.getSize());
                    boardFilesList.add(boardFiles);
                }
            }
            boardDTO.setFiles(boardFilesList);
        }
        communityService.updateBoard(boardDTO); // 게시글 업데이트 호출
        return ResponseEntity.ok("게시글이 업데이트되었습니다.");
    }
    // 게시글 삭제
    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable int boardId) {
        int deletedRows = communityService.deleteBoard(boardId);
        if (deletedRows > 0) {
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게시글이 존재하지 않습니다.");
        }
    }

}
