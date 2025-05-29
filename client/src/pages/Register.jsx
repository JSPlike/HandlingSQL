import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function Register() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        username,
        password,
      });

      setMessage(response.data.message || '회원가입 성공');
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.error || '에러 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">이메일</label>
            <input type="email" className="form-control" value={username} autoComplete="username"
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input type="password" className="form-control" value={password} autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">비밀번호 확인</label>
            <input type="password" className="form-control" value={confirmPassword} autoComplete="new-confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {message && <p style={{ marginTop: '10px' }}>{message}</p>}

          <button className="btn btn-success w-100" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : '가입하기'}
          </button>
        </form>
        
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
