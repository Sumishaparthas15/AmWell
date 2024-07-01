import Navbar from '../Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, getLocal } from '../../helpers/Hosauth'; // Corrected import name
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { setUser } from '../../redux/HosAuthSlice'; // Corrected import
import toast from 'react-hot-toast';

const HosLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const response = getLocal(); // Corrected function name

  const dispatch = useDispatch();

  useEffect(() => {
    if (response) {
      navigate('/');
    }
  }, [response, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Please enter email field!");
      return;
    }

    try {
      const response = await login(e);
      if (response.access) {
        const decoded = jwtDecode(response.access);
        dispatch(setUser(decoded));
        navigate('/overview');
      } else {
        throw new Error("Invalid token");
      }
    } catch (err) {
      console.log("Error occurred:", err);
      toast.error("Login failed!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className='logindiv'>
        <h2 className='title'>Hospital Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' className='inputsize form-control' value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" required />
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' className='inputsize form-control' value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" aria-describedby="passwordHelp" required />
            <br />
            <button type="submit" className="loginbtn">Login</button>
          </div>
        </form>
        <p>Don't have an account? <Link to="/hossignup/">Register</Link></p>
        <div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default HosLogin;
