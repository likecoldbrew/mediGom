package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.service.DoctorInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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


    // 의사 검색
    @GetMapping("/search")
    public List<DoctorInfoDTO> searchDoctors(@RequestParam String name) {
        return doctorInfoService.searchDoctors(name);
    }

    //전체 진료과
    @GetMapping("/allDepartment")
    public List<DoctorInfoDTO> getDepartments() {
        return doctorInfoService.getAllDepartments();
    }

    // 진료과 검색
    @GetMapping("/department")
    public List<DoctorInfoDTO> searchDepartment(@RequestParam String departmentName) {
        return doctorInfoService.searchDepartment(departmentName);
    }

}
