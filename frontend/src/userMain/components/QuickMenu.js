import React from "react";

import { useNavigate } from "react-router-dom";

const QuickMenu=()=>{
    const navigate = useNavigate(); // useNavigate 훅 사용
    const sidebarItems = [
        { name: "간편예약", icon: "🗓️", path: "/111" },
        { name: "진료과/의료진 검색", icon: "🔍", path: "/102"  },
        { name: "증명서 발급", icon: "📄", path: "/121"  },
        { name: "이용안내", icon: "ℹ️", path: "/103"  },
    ];
    const handleNavigation = (path) => {
        navigate(path); // path로 이동
    };
    return (
        <div className="sticky top-10 right-4 bg-sky-100 rounded-lg p-4 shadow-md h-60">

            <div className="space-y-4 h-full  overflow-y-auto">

                {sidebarItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleNavigation(item.path)}
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