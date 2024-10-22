import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";
import ChatBot from "../components/ChatBot";
import { useUser } from "../../utils/UserContext";
import AlertModal from "../components/AlertModal";


const UserMyPage = () => {
  const location = useLocation();
  const { selectCategory, selectSubCategory } = location.state || {};
  const { userInfo, isLoading } = useUser(); //유저 정보
  const [formData, setFormData] = useState({
    userId: "",
    userPass: "",
    userName: "",
    userRrn: "",
    userAdd: "",
    userAdd2: "",
    phone: "",
    email: ""
  });
  // AlertModal 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtonText, setModalButtonText] = useState("확인");
  const [modalRedirectPath, setRedirectPath] = useState("/");
  const [isSuccess, setIsSuccess] = useState(false);

  //로그인 안하면 접근 못하게 막기
  useEffect(() => {
    if (isLoading && !userInfo.userId) {
      setModalMessage("로그인 후 이용가능합니다.");
      setModalButtonText("로그인 하기");
      setModalOpen(true);
      setIsSuccess(false); // isSuccess 상태 업데이트
      setRedirectPath("/login"); // 로그인페이지로 보내기
    } else {
      window.scrollTo(0, 0);
    }
    fetchUsers();
  }, [isLoading, userInfo]); // navigate 추가

  //로그인 한 유저 정보 가져오기
  const fetchUsers = async () => {
    try {
      const response = await fetch(`/api/users/patients`);
      const data = await response.json();
      // 로그인한 유저의 ID와 일치하는 환자 정보 필터링
      const loginUser = data.find(patient => patient.userId === userInfo.userId);
      console.log("로그인한 유저", loginUser);
      if (loginUser) {
        setFormData({
            userId: loginUser.userId,
            userPass: "",
            userName: loginUser.userName,
            userRrn: loginUser.userRrn,
            userAdd: loginUser.userAdd,
            userAdd2: loginUser.userAdd2,
            phone: loginUser.phone,
            email: loginUser.email
          }
        );
      } else {
        console.error("해당 유저의 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //입력값 다루기
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value  // name에 해당하는 필드 업데이트
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SubCategories />
      <div className="container mx-auto px-4 py-8 flex flex-grow">
        <main className="flex-grow flex-col pr-8">
          <div className="flex-col min-h-full space-y-4 items-center justify-center">
            <div className="w-full mx-auto bg-white p-8 rounded-lg shadow-md">
              <form className="space-y-6">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-grow space-y-4">
                    <div>
                      <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                        아이디
                      </label>
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        className="w-full mt-1 text-sky-500 block px-2 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-800 focus:border-indigo-500 sm:text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="userPass" className="block text-sm font-medium text-gray-700 mb-2">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        id="userPass"
                        name="userPass"
                        value={formData.userPass}
                        placeholder="비밀번호 변경 희망시 새 비밀번호를 입력하세요."
                        className="w-full mt-1 text-sky-500 block px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="userPwCheck" className="block text-sm font-medium text-gray-700 mb-2">
                        비밀번호 확인
                      </label>
                      <input
                        type="password"
                        id="userPwCheck"
                        name="userPwCheck"
                        value={(e)=>e.target.value}
                        placeholder="비밀번호 변경 희망시 새 비밀번호를 입력하세요."
                        className="w-full mt-1 block px-3 py-2 text-sky-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                        이름
                      </label>
                      <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        className="w-full mt-1 block px-3 py-2 text-sky-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="userBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        생년월일
                      </label>
                      <input
                        type="text"
                        id="userBirth"
                        name="userBirth"
                        value={formData.userRrn}
                        className="w-full mt-1 block px-3 py-2 text-sky-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        전화번호
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        className="w-full mt-1 block px-3 text-sky-500 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        이메일
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        className="w-full mt-1 block px-3 py-2  text-sky-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="userAdd" className="block text-sm font-medium text-gray-700 mb-2">
                        주소
                      </label>
                      <input
                        type="text"
                        id="userAdd"
                        name="userAdd"
                        value={formData.userAdd + formData.userAdd2}
                        className="w-full mt-1 block px-3 py-2  text-sky-500 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:border-indigo-500 sm:text-sm"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 text-sky-500 border border-transparent shadow-sm text-sm font-medium rounded-md bg-sky-100 hover:bg-sky-400 hover:text-white hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    변경하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <div className="flex flex-col space-y-4">
          <QuickMenu />
          <ChatBot />
        </div>
      </div>
      <AlertModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        buttonText={modalButtonText}
        isSuccess={isSuccess}
        redirectPath={modalRedirectPath}
        state={{ selectCategory, selectSubCategory }}
      />
    </div>
  );
};

export default UserMyPage;
