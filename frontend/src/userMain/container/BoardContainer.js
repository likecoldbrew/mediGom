import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  Link,
  useLocation,
  Route,
} from "react-router-dom";
import SubCategories from "../components/SubCategory";
import QuickMenu from "../components/QuickMenu";
import ChatBot from "../components/ChatBot";
import UserMain from "../index";
import MainPage from "../pages/MainPage";
import DoctorInfo from "../pages/DoctorInfo";
import DepartmentInfo from "../pages/DepartmentInfo";
import HospitalInfo from "../pages/HospitalInfo";
import Community from "../pages/Community";
import CommunityDetail from "../pages/CommunityDetail";
import BoardRegist from "../pages/BoardRegist";
import BoardUpdate from "../pages/BoardUpdate";
import Faq from "../pages/Faq";

const BoardContainer = () => {
  const { boardId, action } = useParams();
  const location = useLocation();

  // boardId가 "regist" 또는 "update"가 아니면 게시글 상세페이지를 보여줌
  if (location.pathname.includes("regist")) {
    return <BoardRegist />;
  }
  if (location.pathname.includes("update")) {
    return <BoardUpdate boardId={boardId} />;
  }
  // 위 조건이 모두 아닐 경우, boardId는 게시글 ID로 간주하고 상세 페이지를 렌더링
  return <CommunityDetail boardId={boardId} />;
};

export default BoardContainer;
