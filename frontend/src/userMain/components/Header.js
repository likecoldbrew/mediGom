import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../style/tailwind.css';


const Header = () => {
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    /*선택한 카테고리 명*/
    const [selectCategory, setSelectCategory] = useState(null);
    const [selectSubCategory, setSelectSubCategory] = useState(null);
    useEffect(() => {
        axios.get('/api/categories/main')  // Use axios instead of fetch
            .then(response => {
                console.log('Categories fetched:', response.data);
                setCategories(response.data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
    const handleSubCategorySelect = (categoryName, subCategoryName) => {
        setSelectCategory(categoryName);
        setSelectSubCategory(subCategoryName);
    };
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="h-24">
                        <img src="/images/userMain/logo.png" className="h-24" alt="logo" />
                    </Link>
                    <nav className="hidden md:flex space-x-10">
                        <button className="text-sky-600 hover:text-sky-800 hover:font-bold transition-colors">로그인
                        </button>
                        <button className="text-sky-600 hover:text-sky-800 hover:font-bold transition-colors">회원가입
                        </button>
                    </nav>
                </div>
                <nav className="mt-4 flex-1 flex flex-wrap justify-center gap-12 sm:gap-6 lg:gap-28">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => setHoveredCategory(category.name)}
                        >
            <span
                className="cursor-pointer text-sky-600 text-lg sm:text-base lg:text-xl hover:font-bold hover:text-sky-800 transition-colors">
                {category.name}
            </span>
                            {hoveredCategory === category.name && category.subcategories && category.subcategories.length > 0 && (
                                <div
                                    className="absolute left-0 mt-2 w-40 sm:w-36 lg:w-48 bg-white border rounded shadow-lg"
                                    onMouseEnter={() => setHoveredCategory(category.name)}
                                    onMouseLeave={() => setHoveredCategory(null)}
                                >
                                    {category.subcategories.map((sub) => (
                                        <Link
                                            key={sub.categoryId}
                                            to={`/${sub.categoryId}`}
                                            state={{selectCategory: category.name, selectSubCategory: sub.name}}
                                            onClick={() => handleSubCategorySelect(category.name, sub.name)}
                                        >
                                            <div
                                                className="px-3 py-1 sm:px-2 sm:py-1 lg:px-4 lg:py-2 hover:bg-sky-100 cursor-pointer hover:font-bold">

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
        </header>
    );
};

export default Header;
