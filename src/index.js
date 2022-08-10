import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import { SignUpForm } from './SignUpForm';
import AdminDashboard from './AdminDashboard';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='login' element={<LoginForm />} />
        <Route path='signup' element={<SignUpForm />} />
        <Route path='dash' element={<AdminDashboard />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
