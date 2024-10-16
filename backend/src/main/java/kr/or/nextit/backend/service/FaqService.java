package kr.or.nextit.backend.service;


import jakarta.transaction.Transactional;
import kr.or.nextit.backend.mapper.CommunityMapper;
import kr.or.nextit.backend.mapper.FaqMapper;
import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.Faq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqMapper faqMapper;

    public List<Faq> selectAllFaq() {
        return faqMapper.selectAllFaq();
    }

    public List<Faq> selectFaq(int faqId) {
        return faqMapper.selectFaq(faqId);
    }
    public void insertFaq(Faq faq) {
        faqMapper.insertFaq(faq); // 게시글 업데이트 호출
    }



}
