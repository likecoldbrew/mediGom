import React from "react";

const DoctorInfoModal = ({ isOpen, onClose, doctor, career, education }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">
          {doctor ? doctor.userName : "의사 정보"}
        </h2>

        <div className="mb-4 rounded-[10px] border border-sky-200 px-3 py-2.5">
          <h3 className="text-xl font-bold mb-3">학력</h3>
          {education && education.length > 0 ? (
            <ul className="list-disc list-inside ml-2">
              {education.map((edu) => (
                <li key={edu.id}> <span className="mr-2">{edu.educationDate}</span> <span className=" text-sky-500 font-bold">{edu.educationBackground}</span> </li>
              ))}
            </ul>
          ) : (
            <p>학력 정보가 없습니다.</p>
          )}
        </div>

        <div className="mb-4 mt-4 rounded-[10px] border border-sky-200 px-3 py-2.5">
          <h3 className="text-xl  font-bold mb-3">경력</h3>
          {career && career.length > 0 ? (
            <ul className="list-disc list-inside ml-2">
              {career.map((car) => (
                <li key={car.id}><span className="mr-2">{car.careerDate}</span> <span className=" text-sky-500 font-bold">{car.careerInfo}</span>
                </li>
                ))}
            </ul>
          ) : (
            <p>경력 정보가 없습니다.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-sky-200 hover:font-bold px-4 py-2 rounded"
          >
            닫기
        </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoModal;
