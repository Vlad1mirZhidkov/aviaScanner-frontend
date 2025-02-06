import React, { useEffect, useState } from 'react';
import '../static/css/datesPageStyle.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const DatesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { origin, destination } = location.state || { origin: "City N", destination: "City Z" };
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const generateRandomFlights = (count) => {
            const flights = [];
            for (let i = 0; i < count; i++) {
                const startDay = Math.floor(Math.random() * 25) + 1;
                const duration = Math.floor(Math.random() * 7) + 1;
                let endDay = startDay + duration;
                if (endDay > 28) endDay = 28;
                const month = Math.floor(Math.random() * 12) + 1;

                const formatDay = startDay < 10 ? '0' + startDay : startDay;
                const formatEndDay = endDay < 10 ? '0' + endDay : endDay;
                const formatMonth = month < 10 ? '0' + month : month;

                const dateStr = `${formatDay}.${formatMonth}.2023 - ${formatEndDay}.${formatMonth}.2023`;
                const price = Math.floor(Math.random() * 8000) + 2000;
                flights.push({ id: i, dates: dateStr, price });
            }
            return flights;
        };

        const randomFlights = generateRandomFlights(6);
        setFlights(randomFlights);

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

    const handleDateClick = () => {
        navigate('/hotel');
    };

    return (
        <div>
            <div className="interactive-bg">
                <div className="cursor-effect"></div>
            </div>

            <header className="header">
                <div className="header__container">
                    <Link to="/main" className="header__logo no-underline" aria-label="Главная страница">
                        AviaScan
                    </Link>
                    <nav className="header__nav">
                        <div className="header__buttons">
                            <Link to="/notifications" className="header__notifications-btn no-underline" aria-label="Уведомления">
                                <FaBell />
                                <span className="notification-badge">3</span>
                            </Link>
                            <Link to="/profile" className="header__profile-btn no-underline" aria-label="Профиль">
                                <FaUserCircle />
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="main">
                <h2 className="results-title">
                    {origin} - {destination}
                </h2>

                <div className="dates-container">
                    {flights.length ? (
                        flights.map((flight) => (
                            <div key={flight.id} className="date-row" onClick={handleDateClick} style={{ cursor: 'pointer' }}>
                                <span className="date-info">{flight.dates}</span>
                                <span className="price-info">Стоимость билетов: {flight.price}₽</span>
                            </div>
                        ))
                    ) : (
                        <p>Загрузка данных...</p>
                    )}
                </div>

                <div className="pagination">
                    <button type="button" className="pagination__btn">
                        1
                    </button>
                    <button type="button" className="pagination__btn">
                        2
                    </button>
                    <button type="button" className="pagination__btn">
                        3
                    </button>
                    <button type="button" className="pagination__btn">
                        ...
                    </button>
                    <button type="button" className="pagination__btn">
                        n
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DatesPage;