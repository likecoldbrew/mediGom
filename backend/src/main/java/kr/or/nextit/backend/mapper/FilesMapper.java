package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.BoardFiles;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FilesMapper {
    void saveAll(List<BoardFiles> boardFiles);
    BoardFiles selectFile(int fileId);
}