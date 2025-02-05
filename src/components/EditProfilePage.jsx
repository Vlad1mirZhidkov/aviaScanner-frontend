import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../static/css/editProfilePageStyle.css';
import { FaUserCircle, FaSave, FaBell } from 'react-icons/fa';

const EditProfilePage = () => {
    const [user, setUser] = useState({
        name: 'Александр Иванов',
        email: 'alexander@example.com',
        phone: '+7 (999) 123-45-67',
        city: 'Москва',
        avatar: null,
    });


    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUser(prev => ({ ...prev, avatar: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Сохранение данных пользователя:", user);
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

            <main className="main edit-profile-main">
                <div className="edit-profile-card">
                    <h2 className="edit-profile-title">Редактирование профиля</h2>
                    <form onSubmit={handleSubmit} className="edit-profile-form">
                        <div className="avatar-section">
                            <label htmlFor="avatar-input" className="avatar-label">
                                {avatarPreview || user.avatar ? (
                                    <img src={avatarPreview || user.avatar} alt="Аватар" className="avatar-preview" />
                                ) : (
                                    <FaUserCircle className="default-avatar" />
                                )}
                                <span className="upload-text">Добавить фото</span>
                            </label>
                            <input
                                type="file"
                                id="avatar-input"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="name">Имя:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Телефон:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">Город:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="profile-btn save-btn">
                            <FaSave /> Сохранить изменения
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditProfilePage; 