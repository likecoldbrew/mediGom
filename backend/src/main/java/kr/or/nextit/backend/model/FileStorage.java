package kr.or.nextit.backend.model;

import org.springframework.stereotype.Component;

import java.io.File;


@Component
public class FileStorage {
    // 사용자 파일 업로드 경로
    private final  String filePath = System.getProperty("user.home") + "/Desktop/mediGom";

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