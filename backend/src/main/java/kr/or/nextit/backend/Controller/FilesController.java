package kr.or.nextit.backend.Controller;


import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.service.FilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class FilesController {

    private final FilesService filesService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadFiles(@RequestParam(value = "files") MultipartFile[] files) {
        List<BoardFiles> boardFilesList = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                String randomFileName = UUID.randomUUID().toString();
                String uploadDir = filesService.getUploadDir();
                String filePath = uploadDir + "/" + randomFileName + "_" + file.getOriginalFilename();
                try {
                    // 파일을 서버에 저장
                    file.transferTo(new File(filePath));

                    BoardFiles boardFiles = new BoardFiles();
                    boardFiles.setFileName(randomFileName + "_" + file.getOriginalFilename());
                    boardFiles.setFileOriginalName(file.getOriginalFilename());
                    boardFiles.setFilePath(filePath);
                    boardFiles.setFileSize((int) file.getSize());
                    boardFiles.setFileType(file.getContentType());
                    boardFilesList.add(boardFiles);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("파일 업로드 중 오류가 발생했습니다." + e.getMessage());
                }
            }
        }
        filesService.saveFiles(boardFilesList);
        return ResponseEntity.ok("파일이 업로드되었습니다.");
    }



    @GetMapping("/view/{fileId}")
    public ResponseEntity<byte[]> viewFile(@PathVariable int fileId) {
        BoardFiles file = filesService.getFileById(fileId); // 파일 ID로 파일 정보 조회
        if (file == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 파일이 없으면 404 반환
        }

        Path filePath = Paths.get(file.getFilePath());
        System.out.println("경로"+ filePath);
        try {
            byte[] fileBytes = Files.readAllBytes(filePath); // 파일을 바이트 배열로 읽음
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getFileType()))
                    .body(fileBytes); // 바이트 배열로 반환
        } catch (IOException e) {
            System.out.println("파일을 읽는 도중 에러 발생: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
