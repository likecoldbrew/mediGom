import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SubCategories from "../../components/SubCategory";
import DoctorInfo from "../DoctorInfo";
import DepartmentInfo from "../DepartmentInfo";
import HospitalInfo from "../HospitalInfo";
import Community from "../Community";
import Faq from "../Faq";
import FaqRegist from "../FaqRegist";
import FaqUpdate from "../FaqUpdate";
import Notification from "../Notification";
import BoardRegist from "../BoardRegist";
import BoardUpdate from "../BoardUpdate";
import CommunityDetail from "../CommunityDetail";
import NotificationRegist from "../NotificationRegist";
import NotificationDetail from "../NotificationDetail";
import NotificationUpdate from "../NotificationUpdate";
import Inquiries from "../Inquiries";
import InquiriesDetail from "../InquiriesDetail";

const CategoryContainer = () => {
  const { urlName, page, action } = useParams();
  const location = useLocation();
  // 디버깅을 위해 현재 매개변수를 콘솔에 출력

  switch (urlName) {
    case "mediInfo":
      return <DoctorInfo />;
    case "department":
      return <DepartmentInfo />;
    case "hospitalInfo":
      return <HospitalInfo />;
    case "subcategory":
      return <SubCategories />;
    case "community":
      return <Community page={page} />;
    case "board":
      if (action === "register") {
        return <BoardRegist />;
      }
      if (action === "update") {
        return <BoardUpdate boardId={page} />;
      }
      return <CommunityDetail boardId={page} />;
    case "faq":
      if (action === "register") {
        return <FaqRegist />;
      }
      if (action === "update") {
        return <FaqUpdate faqId={page} />;
      }
      return <Faq page={page} />; // 기본적인 faq 처리
    case "notice":
      if (action === "register") {
        return <NotificationRegist />;
      }
      if (action === "detail") {
        return <NotificationDetail boardId={page} />;
      }
      if (action === "update") {
        return <NotificationUpdate boardId={page} />;
      }
      return <Notification page={page} />;
    case "inquiry":
      if (action === "detail") {
        return <InquiriesDetail boardId={page} />;
      }
      return <Inquiries page={page} />;
    default:
      return <div>Category not found</div>;
  }
};

export default CategoryContainer;
