import React,{useState} from 'react';
import { Calendar, Clock, AlertCircle, FileText,ChevronLeft, ChevronRight,List } from 'lucide-react';
// import ScrollableContent from './ScrollableContent';

export const Home = () => {

    const DoctorSchedule = () => {
        const [currentMonth, setCurrentMonth] = useState(new Date());

        const prevMonth = () => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        };

        const nextMonth = () => {
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        };

        const getDaysInMonth = (date: Date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const days = new Date(year, month + 1, 0).getDate();
            return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
        };

        const renderCalendar = () => {
            const days = getDaysInMonth(currentMonth);
            const firstDayOfMonth = days[0].getDay();
            const daysWithPadding = Array(firstDayOfMonth).fill(null).concat(days);

            return daysWithPadding.map((day, index) => {
                if (!day) return <th key={`empty-${index}`} className="p-1"></th>;

                const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][day.getDay()];
                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                const hasSchedule = [1, 2, 3, 7, 8, 9].includes(day.getDate()); // 예시 일정

                return (
                    <th key={day.toISOString()} scope="col" className={`p-1 text-center ${isWeekend ? 'text-red-500' : ''} ${hasSchedule ? 'font-bold' : ''}`}>
                        <div className="text-xs">{dayOfWeek}</div>
                        <div>{day.getDate().toString().padStart(2, '0')}</div>
                    </th>
                );
            });
        };

        const renderSchedule = (period: 'morning' | 'afternoon') => {
            const days = getDaysInMonth(currentMonth);
            const firstDayOfMonth = days[0].getDay();
            const daysWithPadding = Array(firstDayOfMonth).fill(null).concat(days);

            return daysWithPadding.map((day, index) => {
                if (!day) return <td key={`empty-${index}`} className="p-1"></td>;

                const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                const hasSchedule = [1, 2, 3, 7, 8, 9].includes(day.getDate()) && period === 'morning'; // 예시 일정

                return (
                    <td key={`${day.toISOString()}-${period}`} className={`p-1 text-center ${isWeekend ? 'bg-gray-100' : ''}`}>
                        {hasSchedule && (
                            <div className="text-xs font-semibold text-blue-600">본원외래</div>
                        )}
                    </td>
                );
            });
        };

        return (
            <div className="doctor-paper-schedule bg-white p-4 rounded-lg shadow">
                <div className="flex justify-center items-center ">
                    <div className="flex space-x-2">
                        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-200">
                            <ChevronLeft size={20}/>
                        </button>
                    <h2 className="text-xl font-bold">진료일정 {currentMonth.getMonth() + 1}월</h2>
                        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-200">
                            <ChevronRight size={20}/>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto p-1.5">
                    <table className=" w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="p-1 border-r-4  border-gray-400">날짜</th>
                            {renderCalendar()}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th className="p-1 border-r-4 border-amber-400 text-left">오전</th>
                            {renderSchedule('morning')}
                        </tr>
                        <tr>
                            <th className="p-1 border-r-4 border-red-400 text-left">오후</th>
                            {renderSchedule('afternoon')}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="p-8 bg-gray-100">
            <h1 className="text-2xl font-semibold mb-1">Home</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DoctorSchedule 컴포넌트 추가 */}
                <DoctorSchedule/>

                {/* Announcements Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <AlertCircle className="mr-2"/> 공지사항
                    </h2>
                    <ul className="space-y-2">
                        <li>• 10월 31일 병원 창립기념일 휴무 안내</li>
                        <li>• 독감 예방접종 실시 안내 (10/15 ~ 11/30)</li>
                        <li>• 신규 의료장비 도입 및 사용 교육 (10/20)</li>
                    </ul>
                </div>

                {/* Weather/Menu Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <List className="mr-2"/> 식단
                    </h2>
                    <p>아침 식단: 불고기덮밥, 미역국, 김치, 샐러드</p>
                    <p>점심 식단: 불고기덮밥, 미역국, 김치, 샐러드</p>
                    <p>저녁 식단: 불고기덮밥, 미역국, 김치, 샐러드</p>
                </div>

                {/* Personal Alerts Section */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Clock className="mr-2" /> 개인알람
                    </h2>
                    <ul className="space-y-2">
                        <li>• 14:00 - 김OO 환자 상담</li>
                        <li>• 15:30 - 의료진 회의</li>
                        <li>• 17:00 - 신규 장비 교육</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home;