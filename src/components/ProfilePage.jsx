import React from 'react';
import '../static/css/profilePageStyle.css';
import { FaUserCircle, FaEdit, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const user = {
        name: 'Александр Иванов',
        email: 'alexander@example.com',
        phone: '+7 (999) 123-45-67',
        city: 'Москва',
        avatar: null,
    };

    React.useEffect(() => {
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
                            </Link>
                            <Link to="/profile" className="header__profile-btn" aria-label="Профиль">
                                <FaUserCircle />
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="main profile-main">
                <div className="profile-card">
                    <div className="profile-avatar">
                        {user.avatar ? (
                            <img src={user.avatar} alt="Аватар пользователя" />
                        ) : (
                            <FaUserCircle className="default-avatar" />
                        )}
                    </div>
                    <div className="profile-details">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-city">
                            <strong>Город проживания: </strong>{user.city}
                        </p>
                        <div className="contact-info">
                            <p>
                                <strong>Email: </strong>{user.email}
                            </p>
                            <p>
                                <strong>Телефон: </strong>{user.phone}
                            </p>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <Link to="/profile/edit" className="profile-btn edit-btn" style={{ textDecoration: 'none' }}>
                            <FaEdit /> Редактировать профиль
                        </Link>
                        <Link to="/" className="profile-btn logout-btn" style={{ textDecoration: 'none' }}>
                            <FaSignOutAlt /> Выйти из аккаунта
                        </Link>
                        <Link to="/active-tickets" className="profile-btn tickets-btn" style={{ textDecoration: 'none' }}>
                            Действующие билеты
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage; 