package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.FileStorage;
import kr.or.nextit.backend.service.CommunityService;
import kr.or.nextit.backend.service.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final FilesService filesService;
    private final FileStorage fileStorage; // FileStorage 주입

    public String getUploadDir() {
        return fileStorage.getUploadDir(); // 메소드로 접근
    }
    //전체 후기글
    @GetMapping("/all")
    public List<Community> getAllBoards() {
        return communityService.getAllBoardsWithUser();
    }
    // 특정 후기글
    @GetMapping("/detail")
    public ResponseEntity<Community> selectBoard(@RequestParam int boardId) {
        Community community = communityService.selectBoard(boardId);
        return ResponseEntity.ok(community);
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
        // 2. 게시글을 먼저 저장 (이후 생성된 게시글 ID를 가져옴)
        communityService.registerBoard(boardDTO);  // 이때 boardDTO에 ID가 할당됨
        int boardId = boardDTO.getBoardId(); // 저장된 게시글의 ID를 가져옴
        // 3. 파일 처리 로직
        if (files != null && files.length > 0) {
            List<Files> filesList = filesService.uploadAndGetFiles(files, boardId); // 업로드한 파일을 게시글 ID와 연관지음
            boardDTO.setFiles(filesList); // 파일 정보를 DTO에 추가
        }

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
        List<Files> filesList = new ArrayList<>();
        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    String filePath = getUploadDir() + "/" + file.getOriginalFilename(); // 업로드 경로 설정
                    Files boardFiles = new Files();
                    // UUID를 사용하여 랜덤한 파일 이름 생성
                    String randomFileName = UUID.randomUUID().toString();
                    boardFiles.setFileName(randomFileName+"/"+file.getOriginalFilename());
                    boardFiles.setFileOriginalName(file.getOriginalFilename());
                    boardFiles.setFilePath(filePath);
                    boardFiles.setFileSize((int) file.getSize());
                    filesList.add(boardFiles);
                }
            }
            boardDTO.setFiles(filesList);
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
