package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.Faq;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FaqMapper {
    List<Faq> selectAllFaq();
    Faq selectFaq(int faqId);
    void insertFaq(Faq faq);
    void updateFaq(Faq faq);
    void deleteFaq(int faqId);
}

