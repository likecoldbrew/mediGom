import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import "../style/index.css";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempted with:', formData);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="w-full bg-sky-100 py-2 border-y border-sky-200">
                <div className="container mx-auto px-4 flex items-center">
                    <img src="/images/userMain/logo.png" className="h-16 mr-2" alt="logo"/>
                    <p className="text-lg font-bold">
                        medi<span className="text-yellow-500">Gom</span>
                    </p>
                </div>
            </header>
            <div className=" flex-grow bg-gray-100 mb-52 flex flex-col items-center justify-center py-6 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        로그인
                    </h2>
                </div>

                <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                                    아이디
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="id"
                                        name="id"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    비밀번호
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        로그인 상태 유지
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        비밀번호를 잊으셨나요?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    로그인
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            계정이 없으신가요?
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        to="/signup"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50"
                                    >
                                        회원가입
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="fixed w-full h-1/10 bottom-0 bg-sky-100 text-sky-800 py-4 mt-1">
                    <div className="container mx-auto px-4 flex items-center justify-center">
                        <img src="/images/userMain/logo.png" className="h-16 mr-4" alt="logo"/>
                        <div className="text-center">
                            <p>주소주소 대표전화: 1555-1234</p>
                            <p>&copy; 2024 mediGom. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

    );
}
