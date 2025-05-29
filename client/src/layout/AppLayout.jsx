// src/layout/AppLayout.js
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppLayout() {
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
        </div>
      </nav>

      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
