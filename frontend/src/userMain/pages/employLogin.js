import React, { useState } from 'react';
import '../style/tailwind.css';

const SignInSignUp = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div className="bg-[#f6f5f7] flex justify-center items-center flex-col font-montserrat h-screen -mt-5 mb-12">
            <h2 className="text-center">MediGom 직원 여러분 환영합니다.</h2>
            <br />
            <div
                className={`relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[10px] shadow-lg transition-all duration-600 ${isRightPanelActive ? 'right-panel-active' : ''}`}
                id="container"
            >
                <div className={`absolute top-0 h-full transition-all duration-600 ${isRightPanelActive ? 'left-[100%]' : 'left-0'} w-1/2 z-2`}>
                    <form action="#" className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
                        <h1 className="font-bold">회원 가입</h1>
                        <div>
                            <label htmlFor="empId">아이디</label>
                            <div>
                                <input className="bg-gray-200 border-none py-3 px-4 my-2 w-full" id="empId" name="empId" type="text" placeholder="Name" />
                                <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none ghost:bg-transparent ghost:border-white">확인</button>
                            </div>
                        </div>
                        <input className="bg-gray-200 border-none py-3 px-4 my-2 w-full" type="email" placeholder="Email" />
                        <input className="bg-gray-200 border-none py-3 px-4 my-2 w-full" type="password" placeholder="Password" />
                        <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none ghost:bg-transparent ghost:border-white">Sign Up</button>
                    </form>
                </div>

                <div className={`absolute top-0 h-full transition-all duration-600 ${isRightPanelActive ? 'left-0' : 'left-[-100%]'} w-1/2 z-1`}>
                    <form action="#" className="bg-white flex items-center justify-center flex-col px-12 h-full text-center">
                        <h1>Sign in</h1>
                        <div className="social-container my-5">
                            <a href="#" className="border border-gray-300 rounded-full flex justify-center items-center h-10 w-10 mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full flex justify-center items-center h-10 w-10 mx-1">
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="border border-gray-300 rounded-full flex justify-center items-center h-10 w-10 mx-1">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span className="text-[12px]">or use your account</span>
                        <input className="bg-gray-200 border-none py-3 px-4 my-2 w-full" type="email" placeholder="Email" />
                        <input className="bg-gray-200 border-none py-3 px-4 my-2 w-full" type="password" placeholder="Password" />
                        <a href="#" className="text-[#333] text-[14px] my-3">Forgot your password?</a>
                        <button className="rounded-[20px] border border-[#FF4B2B] bg-[#FF4B2B] text-white text-[12px] font-bold py-3 px-11 tracking-wider uppercase transition-transform duration-80 ease-in active:scale-95 focus:outline-none ghost:bg-transparent ghost:border-white">Sign In</button>
                    </form>
                </div>

                <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 z-100">
                    <div className={`h-full w-[200%] bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] transition-transform duration-600 ${isRightPanelActive ? 'translate-x-[50%]' : 'translate-x-0'}`}>
                        <div className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 transition-transform duration-600 ${isRightPanelActive ? 'translate-x-[-20%]' : 'translate-x-0'}`}>
                            <h1 className="text-white">Welcome Back!</h1>
                            <p className="text-white text-sm">To keep connected with us please login with your personal info</p>
                            <button className="ghost text-white border border-transparent rounded-full mt-5" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 transition-transform duration-600 ${isRightPanelActive ? 'translate-x-0' : 'translate-x-[20%]'}`}>
                            <h1 className="text-white">Hello, Friend!</h1>
                            <p className="text-white text-sm">Enter your personal details and start journey with us</p>
                            <button className="ghost text-white border border-transparent rounded-full mt-5" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="bg-gray-800 text-white text-sm fixed bottom-0 left-0 right-0 text-center z-50">
                <p className="my-2">© 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SignInSignUp;
