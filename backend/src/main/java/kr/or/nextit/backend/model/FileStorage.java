package kr.or.nextit.backend.model;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Component
public class FileStorage {
    // 사용자 파일 업로드 경로
    private final  String filePath = new File("backend/src/main/resources/static/uploads").getAbsolutePath();
    public String getUploadDir() {
        // 디렉토리가 존재하지 않으면 생성
        File directory = new File(filePath);
        if (!directory.exists()) {
            boolean created = directory.mkdirs(); // 디렉토리 생성
            if (!created) {
                throw new RuntimeException("업로드 디렉토리 생성 실패: " + filePath);
            }
        }
        return filePath;
    }
    public String storeFile(MultipartFile file) {
        String uploadPath = getUploadDir();
        // UUID를 사용하여 랜덤한 파일 이름 생성

        String randomFileName = UUID.randomUUID().toString();
        String fileName = randomFileName +"_" + file.getOriginalFilename();

        File targetFile = new File(uploadPath, fileName);

        try {
            // 파일을 지정한 경로에 저장
            file.transferTo(targetFile);
        } catch (IOException e) {
            throw new RuntimeException("파일 저장에 실패했습니다: " + e.getMessage());
        }
        return fileName; // 저장된 파일의 랜덤 이름 반환
    }
}