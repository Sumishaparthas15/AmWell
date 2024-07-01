// PatientLogin.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import Navbar from '../Navbar/Navbar';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add patient login logic here
    navigate('/patient-dashboard');
  };

  return (
  <div>
    <Navbar/>
    <div className='logindiv'>
      <h2 className='title'>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" name='email' className='inputsize form-control' id="exampleInputEmail1" aria-describedby="emailHelp" required />
          
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" name='password' className='inputsize form-control' id="exampleInputPassword1" aria-describedby="passwordHelp" required />

          <br />
          <button type="submit" className="loginbtn">Login</button>
        </div>
      </form>
      
      <p>Don't have an account? <Link to="/register/patient">Register</Link></p>
      <div>
        <br />
        {/* <button type="button" className="loginbtn1" onClick={() => navigate('/login/doctor')}>Login as Doctor</button> */}
      </div>
    </div>
    </div>
  );
};

export default Login;
