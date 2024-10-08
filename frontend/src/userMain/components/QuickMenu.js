import React from "react";

const QuickMenu=()=>{
    const sidebarItems = [
        { name: "간편예약", icon: "🗓️" },
        { name: "진료과/의료진 검색", icon: "🔍" },
        { name: "증명서 발급", icon: "📄" },
        { name: "이용안내", icon: "ℹ️" },
    ];
    const [isOverflow, setIsOverflow] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (contentRef.current) {
                setIsOverflow(contentRef.current.scrollHeight > contentRef.current.clientHeight);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow); // Resize event 추가
        return () => {
            window.removeEventListener('resize', checkOverflow); // Cleanup
        };
    }, [sidebarItems]);

    return (
        <div className="sticky top-10 right-4 bg-sky-100 rounded-lg p-4 shadow-md h-60">
            <div
                ref={contentRef}
                className={`space-y-4 h-full overflow-y-auto ${isOverflow ? 'text-sm' : 'text-lg'}`} // 글자 크기 조절
            >
                {sidebarItems.map((item, index) => (
                    <button
                        key={index}
                        className="w-full bg-white hover:bg-sky-200 text-sky-800 font-bold py-2 px-4 rounded flex items-center justify-center transition-colors"
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