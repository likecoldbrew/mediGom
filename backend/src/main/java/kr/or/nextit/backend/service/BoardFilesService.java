package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.BoardFilesMapper;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardFilesService {
    private final BoardFilesMapper boardFilesMapper;

    public BoardFiles selectFile(int fileId) {
       return boardFilesMapper.selectFile(fileId);
    }
}
