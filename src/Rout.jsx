import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import MainPage from './components/MainPage';
import HotelPage from './components/HotelPage';
import DatePage from './components/DatePage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';
import ActiveTicketsPage from './components/ActiveTicketsPage';
import NotificationsPage from './components/NotificationsPage';
import PaymentPage from './components/PaymentPage';

function Rout() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/main" element={<MainPage />} />
      <Route path="/hotel" element={<HotelPage />} />
      <Route path="/date" element={<DatePage />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
      <Route path="/active-tickets" element={<ActiveTicketsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/payment" element={<PaymentPage />} />

      <Route
        path="*"
        element={
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            404 Страница не найдена
          </div>
        }
      />
    </Routes>
  );
}

export default Rout;