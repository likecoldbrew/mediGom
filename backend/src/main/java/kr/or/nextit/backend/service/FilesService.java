package kr.or.nextit.backend.service;


import kr.or.nextit.backend.mapper.FilesMapper;
import kr.or.nextit.backend.model.Files;
import kr.or.nextit.backend.model.FileStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FilesService {
    private final FilesMapper filesMapper;
    private final FileStorage fileStorage;

    public String getUploadDir() {
        return fileStorage.getUploadDir(); // 메소드로 접근
    }

    public void saveFiles(List<Files> filesList) {
        filesMapper.saveAll(filesList);
    }

    public Files getFileById(int fileId) {
        return filesMapper.selectFile(fileId); // 매퍼에서 파일 ID로 파일 조회
    }

    public ResponseEntity<byte[]> readFile(Files file) {
        Path filePath = Paths.get(file.getFilePath());
        try {
            byte[] fileBytes = java.nio.file.Files.readAllBytes(filePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getFileType()))
                    .body(fileBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 게시글 ID와 함께 파일 업로드
    public List<Files> uploadAndGetFiles(MultipartFile[] files, int boardId) {
        List<Files> savedFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                // 파일 저장
                String randomFileName = fileStorage.storeFile(file);
                String filePath = fileStorage.getUploadDir() + "/" + randomFileName; // 실제 파일 경로 설정
                Files savedFile = new Files();
                savedFile.setFileName(randomFileName);
                savedFile.setFileOriginalName(file.getOriginalFilename());
                savedFile.setFilePath(filePath);
                savedFile.setFileType(file.getContentType());
                savedFile.setFileSize((int) file.getSize());
                savedFile.setBoardId(boardId); // 게시글 ID 설정
                filesMapper.save(savedFile); // 단일 파일 저장 호출
                savedFiles.add(savedFile); // 저장된 파일 목록에 추가
            }
        }
        return savedFiles; // 저장된 파일의 목록 반환
    }
    // 게시글 ID로 모든 파일 조회
    public List<Files> selectAllFiles(int boardId) {
        return filesMapper.selectAllFiles(boardId); // 매퍼를 통해 게시글 ID에 연결된 모든 파일 조회
    }

    // 게시글 ID로 파일 삭제
    public void deleteFiles(List<Integer> fileIds) {
        if (fileIds != null && !fileIds.isEmpty()) {
            // 각 파일 ID에 대해 실제 파일 시스템에서 삭제
            for (int fileId : fileIds) {
                Files file = filesMapper.selectFile(fileId);
                if (file != null) {
                    // 파일 시스템에서 파일 삭제
                    fileStorage.deleteFile(file.getFilePath());
                }
            }
            filesMapper.deleteFiles(fileIds); // DB에서 파일 삭제
        }
    }
}
