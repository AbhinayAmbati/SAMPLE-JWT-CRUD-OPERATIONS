import { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../contexts/AppContext'; 
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const { setUser } = useAppContext(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      setUser(res.data.user); 
      setMessage('User registered successfully');
      navigate('/');
    } catch (error) {
      setMessage('Error registering user: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="container"> 
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Register</button>
          <Link to='/login'>
            <button type="button">Login</button>
          </Link>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
