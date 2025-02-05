import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../static/css/datesPageStyle.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const HotelsPage = () => {
  const navigate = useNavigate();

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

  const handleHotelClick = () => {
    navigate('/payment');
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
        <h2 className="results-title">Выбор отеля</h2>

        <div className="results-container">
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Grand</h3>
              <p>Локация: Москва</p>
              <p>Цена за ночь: от 5000₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Plaza</h3>
              <p>Локация: Санкт-Петербург</p>
              <p>Цена за ночь: от 4500₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Sunrise</h3>
              <p>Локация: Сочи</p>
              <p>Цена за ночь: от 5500₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Imperial</h3>
              <p>Локация: Екатеринбург</p>
              <p>Цена за ночь: от 4800₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Royal</h3>
              <p>Локация: Казань</p>
              <p>Цена за ночь: от 5200₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Elite</h3>
              <p>Локация: Новосибирск</p>
              <p>Цена за ночь: от 4900₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Sapphire</h3>
              <p>Локация: Нижний Новгород</p>
              <p>Цена за ночь: от 4700₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Diamond</h3>
              <p>Локация: Самара</p>
              <p>Цена за ночь: от 5300₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Emerald</h3>
              <p>Локация: Ростов-на-Дону</p>
              <p>Цена за ночь: от 5100₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Opal</h3>
              <p>Локация: Иркутск</p>
              <p>Цена за ночь: от 4950₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Pearl</h3>
              <p>Локация: Владивосток</p>
              <p>Цена за ночь: от 5800₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Onyx</h3>
              <p>Локация: Уфа</p>
              <p>Цена за ночь: от 4600₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Nova</h3>
              <p>Локация: Омск</p>
              <p>Цена за ночь: от 5100₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Prestige</h3>
              <p>Локация: Волгоград</p>
              <p>Цена за ночь: от 5400₽</p>
            </div>
          </div>
          <div className="flight-card" onClick={handleHotelClick} style={{ cursor: 'pointer' }}>
            <div className="flight-info">
              <h3>Hotel Continental</h3>
              <p>Локация: Ростов</p>
              <p>Цена за ночь: от 5600₽</p>
            </div>
          </div>
        </div>

        <div className="pagination">
          <button className="pagination__btn">1</button>
          <button className="pagination__btn">2</button>
          <button className="pagination__btn">3</button>
          <button className="pagination__btn">...</button>
          <button className="pagination__btn">n</button>
        </div>
      </main>
    </div>
  );
};

export default HotelsPage;