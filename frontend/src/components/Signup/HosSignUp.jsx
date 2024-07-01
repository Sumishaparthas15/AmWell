import React, { useState } from 'react';
import './SignUp.css';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const HosSignUp = () => {
  const navigate = useNavigate();
  
  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [uploadImage, setUploadImage] = useState(null); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (hospitalName.trim() === "") {
        toast.error("Please enter hospital name");
        return;
    } else if (!emailRegex.test(email)) {
        toast.error("Enter a valid Email Id");
        return;
    } else if (password !== confirmPassword) {
        toast.error("Passwords didn't match!");
        return;
    } else if (phoneNumber.length !== 10) {
        toast.error("Phone number should contain exactly 10 digits!");
        return;
    } else if (password.length < 6) {
        toast.error("Password should contain at least six characters!");
        return;
    }

    const formData = new FormData();
    formData.append('hospital_name', hospitalName);  // Match Django field names
    formData.append('email', email);
    formData.append('phone_number', phoneNumber);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('district', district);
    formData.append('pin_code', pinCode);
    formData.append('photo', uploadImage);  // Match Django field names
    formData.append('password', password);

    try {
        const response = await fetch('http://127.0.0.1:8080/api/hossignup/', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (response.status === 400) {
            toast.error('Username or Email id already exist!');
            console.log(hospitalName, email, password);
            navigate('/hossignup');
        } else {
            toast.success("User Registered successfully!");
            console.log(hospitalName, email, password);
            navigate('/hoslogin');
        }
    } catch (err) {
        console.error("Some error occurred:", err);
        toast.error("Some error occurred, please try again later!");
        navigate('/hossignup');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUploadImage(file);
  };

  return (
    <div>
      <Toaster position='top-right' reverseOrder={false} />
      <Navbar />
      <div className='signupdiv'>
        <h2 className='title'>Register as Hospital</h2>
        <form onSubmit={signupSubmit}>
          <div className="mb-3">
            <label htmlFor="hospitalName" className="form-label">Hospital Name</label>
            <input type="text" className="form-control" id="hospitalName" name="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />

            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
            <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />

            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />

            <label htmlFor="district" className="form-label">District</label>
            <input type="text" className="form-control" id="district" name="district" value={district} onChange={(e) => setDistrict(e.target.value)} required />

            <label htmlFor="pinCode" className="form-label">Pin-Code</label>
            <input type="text" className="form-control" id="pinCode" name="pinCode" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />

            <label htmlFor="uploadImage" className="form-label">Upload Image</label>
            <input type="file" className="form-control" id="uploadImage" name="uploadImage" onChange={handleFileChange} required />

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <br />
            <button type="submit" className="loginbtn">SignUp</button>
          </div>
        </form>
        <p>Already have an account? <Link to="/hoslogin">Login</Link></p>
      </div>
    </div>
  );
};

export default HosSignUp;
