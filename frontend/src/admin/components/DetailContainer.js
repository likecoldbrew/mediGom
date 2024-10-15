import { useParams } from "react-router-dom";
import DoctorDetail from "../pages/detail/DoctorDetail";
import UserDetail from "../pages/detail/UserDetail";

const DetailContainer = () => {
  const { userNo } = useParams();
  const id = parseInt(userNo);

  // 사용자 타입에 따라 다른 컴포넌트 렌더링
  const isDoctor = id >= 1000;

  // 컴포넌트를 변수로 할당
  const Component = isDoctor ? DoctorDetail : UserDetail;

  // 선택한 컴포넌트 렌더링
  return <Component userNo={userNo} />;
};

export default DetailContainer;
