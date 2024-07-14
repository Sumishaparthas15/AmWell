import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const HosLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/hospital_login/', {
        email: email,
        password: password,
      });
      localStorage.setItem('token', response.data.access);
      alert('Login successful!');
      navigate('/hospital_departments');  // Redirect to profile page or any other route on successful login
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 403) {
        alert('Account not approved by admin.');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="logindiv bg-white">
        <div className="container p-5">
          <h1 className="text-dark">Hospital Login</h1>
          <br />
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p>Don't have an account? <Link to="/hossignup/">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default HosLogin;
