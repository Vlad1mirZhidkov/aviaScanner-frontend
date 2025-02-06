import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../static/css/mainPageStyle.css';
import { FaBell, FaUserCircle, FaPlane, FaExchangeAlt, FaSearch } from 'react-icons/fa';

const MainPage = () => {
    const navigate = useNavigate();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

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
                leftWave.style.left = (x - 20) + 'px';
                leftWave.style.top = y + 'px';
                bg.appendChild(leftWave);
                
                const rightWave = document.createElement('div');
                rightWave.className = 'cursor-side-wave cursor-side-wave--right';
                rightWave.style.left = (x + 20) + 'px';
                rightWave.style.top = y + 'px';
                bg.appendChild(rightWave);
                
                setTimeout(() => {
                    leftWave.remove();
                    rightWave.remove();
                }, 1500);
            }
        };

        document.addEventListener('mousemove', mouseMoveHandler);

        const swapHandler = () => {
            const fromInput = document.getElementById('from');
            const toInput = document.getElementById('to');
            if (fromInput && toInput) {
                const tempValue = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = tempValue;
            
                const fields = document.querySelectorAll('.search-form__field');
                fields.forEach(field => {
                    field.style.animation = 'none';
                    void field.offsetHeight;
                    field.style.animation = 'swapFields 0.5s ease';
                });
            }
        };

        const swapButton = document.querySelector('.swap-button');
        if (swapButton) {
            swapButton.addEventListener('click', swapHandler);
        }

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            if (swapButton) {
                swapButton.removeEventListener('click', swapHandler);
            }
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Проверяем, что оба поля не пусты
        if (!origin || !destination) {
            alert('Пожалуйста, заполните оба поля');
            return;
        }

        // Переход на страницу DatePage с передачей state
        navigate('/date', { state: { origin, destination } });
    };

    return (
        <div>
            <div className="interactive-bg">
                <div className="cursor-effect"></div>
            </div>

            <header className="header">
                <div className="header__container">
                    <Link to="/main" className="header__logo" style={{ textDecoration: 'none' }}>AviaScan</Link>
                    <nav className="header__nav">
                        <div className="header__buttons">
                            <Link to="/notifications" className="header__notifications-btn" aria-label="Уведомления">
                                <FaBell />
                                <span className="notification-badge">3</span>
                            </Link>
                            <Link to="/profile" className="header__profile-btn" aria-label="Профиль">
                                <FaUserCircle />
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="main">
                <div className="search-container">
                    <h2 className="search-title">Найдите идеальный рейс</h2>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="search-form__group">
                            <div className="search-form__field">
                                <FaPlane className="field-icon" />
                                <div className="field-content">
                                    <label htmlFor="origin" className="search-form__label">Откуда</label>
                                    <input 
                                        type="text"
                                        id="origin"
                                        className="search-form__input"
                                        placeholder="Город вылета"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <button type="button" className="swap-button" aria-label="Поменять города местами">
                                <FaExchangeAlt />
                            </button>

                            <div className="search-form__field">
                                <FaPlane className="field-icon" />
                                <div className="field-content">
                                    <label htmlFor="destination" className="search-form__label">Куда</label>
                                    <input 
                                        type="text"
                                        id="destination"
                                        className="search-form__input"
                                        placeholder="Город прилета"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="search-button">
                            <FaSearch />
                            <span className="button-text">Найти рейсы</span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default MainPage;