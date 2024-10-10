import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuickMenu=()=>{
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [categories, setCategories] = useState([]);

    const sidebarItems = [
        { name: "간편예약", icon: "🗓️", path: "/mediReserve", urlName: "mediReserve"  },
        { name: "진료과 검색", icon: "🔍", path: "/department", urlName: "department"   },
        { name: "의료진 검색", icon: "🔍", path: "/mediInfo", urlName: "mediInfo"   },
        { name: "증명서 발급", icon: "📄", path: "/certificate", urlName: "certificate"   },
        { name: "이용안내", icon: "ℹ️", path: "/hospitalInfo", urlName: "hospitalInfo"   },
    ];

        const fetchCategories = async (urlName) => {
            try {
                const response = await axios.get(`/api/categories/${urlName}`);
                return response.data;// 카테고리 정보를 반환
            } catch (error) {
                console.error('Error fetching categories:', error);
                return null; // 에러 발생 시 null 반환
            }
        };


    const handleNavigation = async  (path, urlName) => {
        // 선택한 카테고리에 대한 정보 가져오기
        const categoryInfo = await fetchCategories(urlName);
        if (categoryInfo) {
            // 카테고리 정보와 함께 페이지 이동
            navigate(path, {
                state: {
                    selectCategory: categoryInfo.parentCategoryName, // 부모 카테고리 이름
                    selectSubCategory: categoryInfo.subCategoryName, // 서브 카테고리 이름
                },
            });
        } else {
            // 카테고리 정보를 가져오지 못했을 경우에도 path로 이동
            navigate(path);
        }
    };

    return (
        <div className="sticky top-10 right-4 bg-sky-100 rounded-lg p-4 shadow-md h-80">

            <div className="space-y-4 h-full  overflow-y-auto">

                {sidebarItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleNavigation(item.path, item.urlName)}
                        className="w-full bg-white  hover:bg-sky-200 text-sky-800 font-bold py-2 px-4 rounded flex items-center justify-center transition-colors"
                    >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default QuickMenu;