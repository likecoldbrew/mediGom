import React from "react";

const ChatBot=()=>{
    const icon = "💬"; // 채팅 아이콘
    const name = "챗봇"; // 이름
    return (
        <div className="sticky top-40 right-4 p-4 h-40">
            <button
                className="w-full text-sky-800 font-bold py-4 rounded flex flex-col items-center justify-center transition-colors"
            >
                <div className="w-16 h-16 bg-sky-50 hover:bg-sky-100 rounded-full  flex items-center justify-center mb-2">
                    <span className="text-3xl">{icon}</span>
                </div>
                {name}
            </button>
        </div>
    );
};
export default ChatBot;