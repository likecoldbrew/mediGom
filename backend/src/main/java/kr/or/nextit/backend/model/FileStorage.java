package kr.or.nextit.backend.model;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;


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
}