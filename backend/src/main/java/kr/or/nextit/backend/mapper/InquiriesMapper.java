package kr.or.nextit.backend.mapper;

import kr.or.nextit.backend.model.BoardFiles;
import kr.or.nextit.backend.model.Community;
import kr.or.nextit.backend.model.Inquiries;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface InquiriesMapper {
    //게시글 문의사핟 조회
    List<Inquiries> allInquiries();

}

