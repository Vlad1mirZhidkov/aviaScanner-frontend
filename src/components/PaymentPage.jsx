import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../static/css/datesPageStyle.css';
import '../static/css/paymentPageStyle.css';
import { FaBell, FaUserCircle, FaCreditCard } from 'react-icons/fa';

const PaymentPage = () => {
  const [route, setRoute] = useState({ departure: 'City N', arrival: 'City Z' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://your-backend-endpoint/api/route')
      .then(response => response.json())
      .then(data => {
        setRoute({
          departure: data.departure,
          arrival: data.arrival,
        });
      })
      .catch(error => {
        console.error("Ошибка при получении данных о маршруте:", error);
      });

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

      <main className="main">
        <h2 className="results-title">Оплата</h2>

        <div className="payment-container">
          <div className="payment-summary">
            <h3>Резюме оплаты</h3>
            <p className="amount">15 000₽</p>
            <p>Маршрут: {route.departure} - {route.arrival}</p>
            <p>Дата: 31.10.2023</p>
          </div>

          <form className="payment-form" onSubmit={(e) => { e.preventDefault(); navigate('/main'); }}>
            <h3>Информация о карте</h3>
            <div className="form-group">
              <label htmlFor="cardNumber">Номер карты</label>
              <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="form-group">
              <label htmlFor="cardHolder">Имя владельца</label>
              <input type="text" id="cardHolder" placeholder="Иван Иванов" />
            </div>
            <div className="form-row">
              <div className="form-group-half">
                <label htmlFor="expiry">Срок действия</label>
                <input type="text" id="expiry" placeholder="MM/YY" />
              </div>
              <div className="form-group-half">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" placeholder="123" />
              </div>
            </div>
            <button type="submit" className="search-button">
              <FaCreditCard />
              <span className="button-text">Оплатить</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage; 