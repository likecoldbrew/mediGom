package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Files;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FilesMapper {
    void save(Files file); // 단일 파일 저장 메서드 추가
    void saveAll(List<Files> files);
    Files selectFile(int fileId);
}