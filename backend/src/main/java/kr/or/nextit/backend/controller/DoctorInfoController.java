package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Category;
import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.service.CategoryService;
import kr.or.nextit.backend.service.DoctorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/doctorsInfo")
@RequiredArgsConstructor
public class DoctorInfoController {

    private final DoctorInfoService doctorInfoService;

    @GetMapping("/all")
    public List<DoctorInfoDTO> getDoctors() {
        return doctorInfoService.getAllDoctors();
    }

}
