package kr.or.nextit.backend.Controller;

import jakarta.annotation.Resource;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.FileStorage;
import kr.or.nextit.backend.service.BoardFilesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/file")
@RequiredArgsConstructor
public class BoardFilesController {
    private final BoardFilesService boardFilesService;
    private final FileStorage fileStorage;
}

