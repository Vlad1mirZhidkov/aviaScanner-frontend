import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/datesPageStyle.css'; 
import '../static/css/notificationsPageStyle.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const sampleNotifications = [
            {
                id: 1,
                title: "Бронирование подтверждено",
                message: "Ваше бронирование на рейс в City N успешно подтверждено.",
                time: "10:05"
            },
            {
                id: 2,
                title: "Изменение расписания",
                message: "Рейс в City Z задержан на 30 минут.",
                time: "11:15"
            },
            {
                id: 3,
                title: "Напоминание",
                message: "Не забудьте зарегистрироваться за 2 часа до вылета.",
                time: "12:30"
            },
            {
                id: 4,
                title: "Акция",
                message: "Скидка 20% на следующий рейс – воспользуйтесь предложением!",
                time: "13:45"
            },
            {
                id: 5,
                title: "Информация",
                message: "В аэропорту открыт новый лаунж-зал для наших клиентов.",
                time: "14:20"
            },
            {
                id: 6,
                title: "Обновление",
                message: "Мы обновили правила регистрации. Ознакомьтесь с изменениями.",
                time: "15:55"
            },
        ];

        setNotifications(sampleNotifications);

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
                                <span className="notification-badge">{notifications.length}</span>
                            </Link>
                            <Link to="/profile" className="header__profile-btn" aria-label="Профиль">
                                <FaUserCircle />
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="main">
                <h2 className="results-title">Уведомления</h2>
                <div className="notifications-container">
                    {notifications.length ? (
                        notifications.map((notif) => (
                            <div key={notif.id} className="notification-card">
                                <div className="notification-header">
                                    <strong>{notif.title}</strong>
                                    <span className="notification-time">{notif.time}</span>
                                </div>
                                <div className="notification-message">
                                    {notif.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Загрузка уведомлений...</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default NotificationsPage; 