import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/authPageStyle.css';
import { FaUserCircle } from 'react-icons/fa';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        confirmPassword: '',
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Логин с данными:", loginData);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        console.log("Регистрация с данными:", registerData);
    };

    useEffect(() => {
        const bg = document.querySelector('.interactive-bg');
        const cursorEffect = document.querySelector('.cursor-effect');

        const mouseMoveHandler = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (cursorEffect) {
                cursorEffect.style.left = x + 'px';
                cursorEffect.style.top = y + 'px';
            }

            if (bg) {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                trail.style.left = x + 'px';
                trail.style.top = y + 'px';
                bg.appendChild(trail);
                setTimeout(() => {
                    trail.remove();
                }, 1000);

                const leftWave = document.createElement('div');
                leftWave.className = 'cursor-side-wave cursor-side-wave--left';
                const leftRandomY = Math.floor((Math.random() - 0.5) * 10);
                leftWave.style.left = (x - 20) + 'px';
                leftWave.style.top = (y + leftRandomY) + 'px';
                bg.appendChild(leftWave);

                const rightWave = document.createElement('div');
                rightWave.className = 'cursor-side-wave cursor-side-wave--right';
                const rightRandomY = Math.floor((Math.random() - 0.5) * 10);
                rightWave.style.left = (x + 20) + 'px';
                rightWave.style.top = (y + rightRandomY) + 'px';
                bg.appendChild(rightWave);

                setTimeout(() => {
                    leftWave.remove();
                    rightWave.remove();
                }, 1800);
            }
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    return (
        <div>
            <div className="interactive-bg">
                <div className="cursor-effect"></div>
            </div>

            <header className="header">
                <div className="header__container">
                    <Link to="/main" className="header__logo" style={{ textDecoration: 'none' }}>AviaScan</Link>
                </div>
            </header>

            <main className="main auth-main">
                <div className="auth-card">
                    <ul className="auth-tabs">
                        <li
                            className={isLogin ? 'active' : ''}
                            onClick={() => setIsLogin(true)}
                        >
                            Вход
                        </li>
                        <li
                            className={!isLogin ? 'active' : ''}
                            onClick={() => setIsLogin(false)}
                        >
                            Регистрация
                        </li>
                    </ul>
                    {isLogin ? (
                        <form onSubmit={handleLoginSubmit} className="auth-form">
                            <h2 className="auth-title">Вход в аккаунт</h2>
                            <div className="input-group">
                                <label htmlFor="login-email">Email:</label>
                                <input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="login-password">Пароль:</label>
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="auth-btn">Войти</button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="auth-form">
                            <h2 className="auth-title">Регистрация</h2>
                            <div className="input-group">
                                <label htmlFor="register-name">Имя:</label>
                                <input
                                    type="text"
                                    id="register-name"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="register-email">Email:</label>
                                <input
                                    type="email"
                                    id="register-email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="register-phone">Телефон:</label>
                                <input
                                    type="text"
                                    id="register-phone"
                                    name="phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="register-city">Город:</label>
                                <input
                                    type="text"
                                    id="register-city"
                                    name="city"
                                    value={registerData.city}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="register-password">Пароль:</label>
                                <input
                                    type="password"
                                    id="register-password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="register-confirm-password">Подтвердите пароль:</label>
                                <input
                                    type="password"
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="auth-btn">Зарегистрироваться</button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AuthPage; 