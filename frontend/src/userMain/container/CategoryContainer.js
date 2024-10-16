import React from "react";
import { useParams, useLocation } from "react-router-dom";
import SubCategories from "../components/SubCategory";
import DoctorInfo from "../pages/DoctorInfo";
import DepartmentInfo from "../pages/DepartmentInfo";
import HospitalInfo from "../pages/HospitalInfo";
import Community from "../pages/Community";

import Faq from "../pages/Faq";
import FaqRegist from "../pages/FaqRegist";
import FaqUpdate from "../pages/FaqUpdate";

const CategoryContainer = () => {
  const { urlName, page, action, faqId } = useParams();
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
    case "faq":
      if (action === "register") {
        return <FaqRegist />;
      }
      if (action === "update") {
        return <FaqUpdate faqId={faqId} />;
      }
      return <Faq page={page} />; // 기본적인 faq 처리
    default:
      return <div>Category not found</div>;
  }
};

export default CategoryContainer;
