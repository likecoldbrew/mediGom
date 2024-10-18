package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Hospital;
import kr.or.nextit.backend.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/hospital")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping("/all")
    public List<Hospital> getHospitalInfo() {

        return hospitalService.getHospitalInfo();
    }
}
