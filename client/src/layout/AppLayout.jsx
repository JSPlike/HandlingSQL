// src/layout/AppLayout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppLayout() {
  const [dbUser, setDbUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/getCurrentSchema', { withCredentials: true });

        setDbUser(res.data.result.USER);
      } catch (err) {
        console.error('사용자 정보 조회 실패', err);
      }
    };

    // 처음 실행
    fetchUser();

    // 10초마다 주기적으로 실행
    //const interval = setInterval(fetchUser, 10000);

    // 언마운트 시 정리
    //return () => clearInterval(interval);
  }, []);

  const location = useLocation();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/app">📊 Handling SQL</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className={`nav-item ${location.pathname.includes('create-table') ? 'active' : ''}`}>
              <Link className="nav-link" to="/app/create-table">Table 만들기</Link>
            </li>
            <li className={`nav-item ${location.pathname.includes('tables') ? 'active' : ''}`}>
              <Link className="nav-link" to="/app/sql-test">SQL 테스트</Link>
            </li>
          </ul>
          <span className="navbar-text text-light">
            {dbUser? `👤 ${dbUser}` : '🔒 로그인 안됨'}
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
