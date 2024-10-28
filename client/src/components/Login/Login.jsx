import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const { setUser, setUsername } = useAppContext(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      
      const { token, username } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      setUser(true);
      setUsername(username);
      setMessage('Login successful!');
      navigate('/',{replace:true}); 
    } catch (error) {
      setMessage('Error logging in: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
          <Link to='/register'>
            <button>Register</button>
          </Link>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default Login;
