package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.DoctorInfoDTO;
import kr.or.nextit.backend.model.User;
import kr.or.nextit.backend.service.DoctorInfoService;
import kr.or.nextit.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctorsInfo")
@RequiredArgsConstructor
public class DoctorInfoController {

    private final DoctorInfoService doctorInfoService;
    private final UserService userService;

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
    // 유저 한명 조회
    @GetMapping("/{userNo}")
    public Map<String, Object> getUserByNo(@PathVariable("userNo") int userNo) {
        Map<String, Object> response = new HashMap<>();

        User user = userService.getUserByNo(userNo);
        response.put("user", user);

        // 의사일 경우만 경력과 학력 출력
        if (user.getAdmin() == 1) {
            response.put("career", doctorInfoService.getDoctorCareer(userNo));
            response.put("education", doctorInfoService.getDoctorEducation(userNo));
        }
        return response;
    }



}
