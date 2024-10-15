package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.mapper.InquiriesMapper;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.Inquiries;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiriesService {
    private final InquiriesMapper inquiriesMapper;
    //문의사항 전체 조회
    public List<Inquiries> allInquiries() {
        return inquiriesMapper.allInquiries();
    }
    //특정 문의글 조회
    public List<Inquiries> selectInquiries(int inquirieId) {
        return inquiriesMapper.selectInquiries(inquirieId);
    }

}
