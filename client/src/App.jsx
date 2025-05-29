import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppLayout from './layout/AppLayout';
import SqlPlayground from './pages/SqlPlayground';
import CreateTable from './pages/CreateTable';
import Register from './pages/Register';
import Login from './pages/Login';

function CheckAuth() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate 사용하려면 호출 필요

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth/session', {
      withCredentials: true,
    })
      .then((res) => {
        setIsLoggedIn(true);
        setLoading(false);
        console.log('[세션 정보]', res.data);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setLoading(false);
        navigate('/login');
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Navigate to={isLoggedIn ? "/app" : "/login"} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckAuth />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="create-table" element={<CreateTable />} />
          <Route path="sql-test" element={<SqlPlayground />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
