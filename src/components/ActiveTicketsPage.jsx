import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/activeTicketsPageStyle.css';
import { FaTicketAlt, FaBell, FaUserCircle } from 'react-icons/fa';

const ActiveTicketsPage = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const sampleTickets = [
            {
                id: 1,
                flight: 'SU123',
                departure: 'City N',
                arrival: 'City Z',
                date: '31.10.2023',
                price: '15000₽'
            },
            {
                id: 2,
                flight: 'SU456',
                departure: 'City A',
                arrival: 'City B',
                date: '05.11.2023',
                price: '17000₽'
            },
            {
                id: 3,
                flight: 'SU789',
                departure: 'City X',
                arrival: 'City Y',
                date: '10.11.2023',
                price: '20000₽'
            }
        ];
        setTickets(sampleTickets);

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

            <main className="main active-tickets-main">
                <h2 className="results-title">Мои билеты</h2>
                <div className="tickets-container">
                    {tickets.length ? (
                        tickets.map(ticket => (
                            <div key={ticket.id} className="ticket-card">
                                <div className="ticket-icon">
                                    <FaTicketAlt />
                                </div>
                                <div className="ticket-details">
                                    <h3 className="ticket-flight">Рейс {ticket.flight}</h3>
                                    <p className="ticket-route">
                                        {ticket.departure} &rarr; {ticket.arrival}
                                    </p>
                                    <p className="ticket-date">Дата: {ticket.date}</p>
                                    <p className="ticket-price">Цена: {ticket.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Загрузка билетов...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ActiveTicketsPage; 