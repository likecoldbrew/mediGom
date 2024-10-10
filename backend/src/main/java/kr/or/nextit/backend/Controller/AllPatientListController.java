package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.AllPatientList;
import kr.or.nextit.backend.service.AllPatientListService;
import kr.or.nextit.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/allPatientList")
@RequiredArgsConstructor
@Controller
public class AllPatientListController {
    private final AllPatientListService allPatientListService;

//    @GetMapping("/all")
//    public String getMedicalRecords(@RequestParam("userNo") int userNo, Model model) {
////        List<AllPatientList> records = allPatientListService.getAllPatientList(userNo);
////        model.addAttribute("records", records);
//        return "medicalRecords";  // Thymeleaf 템플릿 파일명
//    }
}