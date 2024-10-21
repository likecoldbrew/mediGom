import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/tailwind.css";
import AlertModal from "./AlertModal";

const Header = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(null);
  const [selectSubCategory, setSelectSubCategory] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지
  const [modalButtonText, setModalButtonText] = useState(""); // 버튼 텍스트
  const [isSuccess, setIsSuccess] = useState(false); // 모달 성공 여부 상태
  const [redirectPath, setRedirectPath] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/main");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error); // 에러 로깅 추가
      }
    };
    fetchCategories();
  }, []);

  const handleSubCategorySelect = (categoryName, subCategoryName) => {
    setSelectCategory(categoryName);
    setSelectSubCategory(subCategoryName);
  };

  useEffect(() => {
    // 페이지 로드 시 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // JWT를 로컬 스토리지에서 가져옴
      if (token) {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}` // JWT 포함
          }
        });

        if (response.ok) {
          const data = await response.json(); // 서버에서 반환하는 사용자 정보
          setUserInfo(data); // 사용자 정보 상태 업데이트
        } else {
          console.error("사용자 정보를 가져오는 데 실패했습니다.");
        }
      }
    };
    fetchUserInfo();
  }, []);

  //모달창 내용
  const showAlertModal = (message, buttonText,  isSuccess = false, redirectPath) => {
    console.log('redirectPath:', redirectPath);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalOpen(true);
    setIsSuccess(isSuccess); // isSuccess 상태 업데이트
    setRedirectPath(redirectPath); // redirectPath 상태 업데이트
  };

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 제거
    setUserInfo(null); // 사용자 정보 초기화
    navigate("/"); // 메인 페이지로 리다이렉트
  };


  return (
    <>
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center mr-auto w-1/5">
            <Link to="/" className="h-24 mr-2">
              <img src="/images/mediGom_Logo.png" className="h-12 sm:h-16 md:h-20 lg:h-24" alt="logo" />
            </Link>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Medi<span
              className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">Gom</span></span>
          </div>
          <div className="flex flex-col items-end w-4/5">
            <div className="flex space-x-4 mb-2">
              {userInfo ? (
                <>
                  <p className="text-[18px] content-center text-sky-700">{userInfo.userId}<span className="text-[14px]  content-center text-sky-700">({userInfo.userName})</span>님 반갑습니다!</p>
                    <button onClick={handleLogout} className="text-sky-600 hover:text-sky-800 hover:font-bold  hover:bg-sky-300 rounded-[10px]  border-2 border-sky-200 px-2 py-1 transition-colors">
                      로그아웃
                    </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="text-sky-600 hover:text-sky-800 hover:font-bold transition-colors">
                      로그인
                    </button>
                  </Link>
                  <Link to="/signUp">
                    <button className="text-sky-600 hover:text-sky-800 hover:font-bold transition-colors">
                      회원가입
                    </button>
                  </Link>
                </>
              )}

            </div>
            <nav
              className="flex justify-around mt-6 space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 pr-10 pt-2 w-full flex-grow">
              {categories.map((category) => (
                <div
                  key={category.id} // category의 고유 ID 사용
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                >
                  <Link
                    to={(category.categoryId
                      === 140 && !userInfo) ? '#' : `/${category.subcategories[0]?.urlName}`} // 첫 번째 하위 카테고리로 링크 설정
                    state={{
                      selectCategory: category.name,
                      selectSubCategory: category.subcategories[0]?.name
                    }}
                    className="cursor-pointer text-sky-600 text-lg sm:text-base lg:text-xl hover:font-bold hover:text-sky-800 transition-colors"
                    onClick={(e) => {
                      if (category.categoryId
                        === 140 && !userInfo) {
                        e.preventDefault(); // 기본 링크 클릭 방지
                        showAlertModal("로그인 후 이용 가능합니다.", "로그인 페이지로 이동", false, "/login"); // 모달 표시
                      } else {
                        handleSubCategorySelect(category.name, category.subcategories[0]?.name); // 클릭 시 상태 설정
                      }
                    }}
                  >
                    {category.name}
                  </Link>
                  {hoveredCategory === category.name &&
                    category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div
                        className="absolute left-0 mt-2 w-40 sm:w-36 lg:w-48 bg-white border rounded shadow-lg"
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.categoryId} // sub의 고유 ID 사용
                            to={(sub.categoryId === 134 || (sub.categoryId >= 140 && sub.categoryId <= 144)) && !userInfo ? '#' : `/${sub.urlName}`}
                            state={{
                              selectCategory: category.name,
                              selectSubCategory: sub.name
                            }}
                            onClick={(e) =>{
                              if ((sub.categoryId === 134 || (sub.categoryId >= 140 && sub.categoryId <= 144)) && !userInfo) {
                                e.preventDefault(); // 기본 링크 클릭 방지
                                showAlertModal("로그인 후 이용 가능합니다.", "로그인 페이지로 이동", false, "/login")
                              } else {
                                handleSubCategorySelect(category.name, category.subcategories[0]?.name); // 클릭 시 상태 설정
                              }
                            }}
                          >
                            <div
                              className="px-3 py-1 sm:px-2 sm:py-1 lg:px-4 lg:py-2 hover:bg-sky-100 cursor-pointer hover:font-bold z-50">
                              {sub.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
      {modalOpen && ( // modalOpen이 true일 때만 AlertModal 렌더링
        <AlertModal
          isOpen={modalOpen}
          message={modalMessage}
          buttonText={modalButtonText}
          onClose={() => setModalOpen(false)}
          isSuccess={isSuccess}
          redirectPath={redirectPath}
        />
      )}

    </>
  );
};

export default Header;
