import React, { useState } from 'react';
import './SignUp.css';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';  // Add this line

const SignUp = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.trim() === "") {
      toast.error("Please enter your name");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid Email Id");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password didn't match!");
      return;
    } else if (phoneNumber.length !== 10) {
      toast.error("Phone number should contain exactly 10 digits!");
      return;
    } else if (password.length < 6) {
      toast.error("Password should contain at least six characters!");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8080/api/register/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              username,
              email,
              password
          })
      });
      const data = await response.json();

      if (response.status === 400) {
          toast.error('Username or Email id already exist!');
          navigate('/register');
      } else {
          toast.success("User Registered successfully!");
          console.log(username,email,password)
          navigate('/login');
      }
  } catch (err) {
      console.error("Some error occurred:", err);
      toast.error("Some error occurred, please try again later!");
      navigate('/register');
  }
  };

  return (
    <div>
      <Toaster position='top-left' reverseOrder={false}></Toaster>
      <Navbar />
      <div className='signupdiv'>
        <h2 className='title'>Register for Patient</h2>
        <form onSubmit={signupSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <br />
            <button type="submit" className="loginbtn">SignUp</button>
          </div>
        </form>
        <p>Already have an account? <Link to="/login/patient">Login</Link></p>
      </div>
    </div>  
  );
};

export default SignUp;
