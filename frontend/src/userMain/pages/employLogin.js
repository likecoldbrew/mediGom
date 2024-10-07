import React, { useState } from 'react';
import './SignInSignUp.css'; // CSS 파일을 임포트합니다.

const SignInSignUp = () => {
    // 상태를 사용하여 패널의 활성화 여부를 관리합니다.
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // Sign Up 버튼 클릭 시 상태를 업데이트합니다.
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    // Sign In 버튼 클릭 시 상태를 업데이트합니다.
    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div>
            <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
            <div
                className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}
                id="container"
            >
                {/* Sign Up 폼 */}
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>

                {/* Sign In 폼 */}
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                {/* 오버레이 컨테이너 */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* 오버레이 왼쪽 패널 */}
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>
                        {/* 오버레이 오른쪽 패널 */}
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 (필요에 따라 수정하세요) */}
            <footer>
                <p>© 2024 Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SignInSignUp;