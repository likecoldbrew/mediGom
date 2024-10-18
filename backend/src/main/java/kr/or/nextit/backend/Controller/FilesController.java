package kr.or.nextit.backend.controller;


import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.service.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FilesController {

    private final FilesService filesService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadFiles(@RequestParam(value = "files") MultipartFile[] files,  @RequestParam(value = "boardId") int boardId) {
        List<Files> filesList = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String randomFileName = UUID.randomUUID().toString();
                String uploadDir = filesService.getUploadDir();
                String filePath = uploadDir + "/" + randomFileName + "_" + file.getOriginalFilename();
                try {
                    // 파일을 서버에 저장
                    file.transferTo(new File(filePath));
                    Files boardFiles = new Files();
                    boardFiles.setFileName(randomFileName + "_" + file.getOriginalFilename());
                    boardFiles.setFileOriginalName(file.getOriginalFilename());
                    boardFiles.setFilePath(filePath);
                    boardFiles.setFileSize((int) file.getSize());
                    boardFiles.setFileType(file.getContentType());
                    filesList.add(boardFiles);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("파일 업로드 중 오류가 발생했습니다." + e.getMessage());
                }
            }
        }
        filesService.saveFiles(filesList, boardId);
        return ResponseEntity.ok("파일이 업로드되었습니다.");
    }



    @GetMapping("/view/{fileId}")
    public ResponseEntity<byte[]> viewFile(@PathVariable int fileId) {
        Files file = filesService.getFileById(fileId);
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return filesService.readFile(file);
    }

    // 특정 파일 삭제 요청 처리 (파일 ID를 URL 경로 변수로 받음)
    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Integer fileId) {
        try {
            // 파일 삭제 서비스 호출
            filesService.deleteFiles(fileId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
