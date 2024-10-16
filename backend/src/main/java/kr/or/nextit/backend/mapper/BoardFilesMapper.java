package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardFilesMapper {
    void saveAll(List<BoardFiles> boardFiles);
    BoardFiles selectFile(int fileId);

}

