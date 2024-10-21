package kr.or.nextit.backend.controller;

import kr.or.nextit.backend.model.Certificate;
import kr.or.nextit.backend.model.Hospital;
import kr.or.nextit.backend.service.CertificateService;
import kr.or.nextit.backend.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/certificates")
public class CertificateViewController {

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private HospitalService hospitalService;

    // 특정 인증서의 정보를 HTML로 렌더링
    @GetMapping("/view/{certificateId}")
    public String viewCertificate(@PathVariable int certificateId, Model model) {
        Certificate certificate = certificateService.getCertificateById(certificateId);
        Hospital hospital = hospitalService.getHospitalInfo();
        if (certificate != null) {
            model.addAttribute("certificate", certificate);
            model.addAttribute("stamp", certificate.getDoctorName().split(""));
            model.addAttribute("hospital", hospital);
            System.out.println(hospital);
            return "diagnosis"; // Thymeleaf 템플릿 파일 이름
        } else {
            return "error"; // 인증서가 없을 경우 에러 페이지
        }
    }
}
