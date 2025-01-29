import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { saveUser } from '../utils/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      saveUser(data.user, data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        <p className='mt-2'>Have no account,<a href="/register">Register</a></p>
        <p className='mt-2 mr-4'>Back <a href="/">Home</a></p>
      </form>
    </div>
  );
};

export default Login;
