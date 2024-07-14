import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/api/patient_login/', {
              email: email,
              password: password,
          });
          localStorage.setItem('token', response.data.token);
          alert('Login successful!');
          navigate('/bookup'); // Redirect to profile or wherever you want
      } catch (error) {
          console.error('Error logging in:', error);
          alert('Invalid credentials or server error');
      }
  };

    return (
        <div>
            <Navbar />
            <div className="logindiv bg-white">
                <div className="container p-5">
                    <h1 className="text-dark">Patient Login</h1>
                    <br />

                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="loginbtn">Login</button>
                    </form>
                    <p>Don't have an account? <Link to="/register/patient/">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
