import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function Login() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        username,
        password,
      });

      setMessage(response.data.message || '로그인 성공');
      navigate('/app');
    } catch (error) {
      setMessage(error.response?.data?.error || '에러 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input type="email" className="form-control" value={username} autoComplete="username"
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input type="password" className="form-control" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {message && <p style={{ color: 'red' }}>{message}</p>}
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : '로그인'}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/register">Don't have an account? Register</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
