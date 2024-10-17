package kr.or.nextit.backend.service;


import kr.or.nextit.backend.mapper.FilesMapper;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.FileStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilesService {
    private final FilesMapper filesMapper;
    private final FileStorage fileStorage;

    public String getUploadDir() {
        return fileStorage.getUploadDir(); // 메소드로 접근
    }

    public void saveFiles(List<BoardFiles> boardFilesList) {
        filesMapper.saveAll(boardFilesList);
    }

    public BoardFiles getFileById(int fileId) {
        return filesMapper.selectFile(fileId); // 매퍼에서 파일 ID로 파일 조회
    }

    public ResponseEntity<byte[]> readFile(BoardFiles file) {
        Path filePath = Paths.get(file.getFilePath());
        try {
            byte[] fileBytes = Files.readAllBytes(filePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getFileType()))
                    .body(fileBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
