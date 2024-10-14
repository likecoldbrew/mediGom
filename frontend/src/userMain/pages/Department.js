import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";
import SubCategories from "../components/SubCategory";

const Department = () => {
  const { subcategory } = useParams();
  return (
    <div>
      <Header />
      {/*<SubCategories subcategory={subcategory} /> /!* Pass subcategory to SubCategories *!/*/}
      <div className="flex-grow container mx-auto px-4 py-8 flex">
        <main className="flex-grow pr-8">
          <div className="bg-gray-200 h-96 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold mt-4">홍길동 박사</h2>
              <p className="text-gray-600">내과 전문의</p>
            </div>
          </div>
        </main>
        <QuickMenu />
      </div>
      <Footer />
    </div>
  );
};

export default Department;
