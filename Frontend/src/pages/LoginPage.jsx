import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/loding.css'; // link to external CSS

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post('http://localhost:5000/api/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });

      console.log('Login success:', res.data);
      navigate('/dashbord');
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Login error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
