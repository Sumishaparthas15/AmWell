import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SignUp from './components/Signup/SignUp';
import HosSignUp from './components/Signup/HosSignUp'; // Fixing the component import
import Login from './components/Login/Login';
import HosLogin from './components/Login/HosLogin'; // Fixing the component import
import AdminLoginPage from './admin/AdminPages/AdminLoginPage';
import OverViewPage from './admin/AdminPages/OverViewPage';
import PatientPage from './admin/AdminPages/PatientPage';
import Hospital from './components/Hospital/Hospital';
import HospitalSignup from './pages/HospitalSignup'; // Fixing the component import
import HospitalRequests from './admin/AdminPages/HospitalRequestsPage';
import HospitalRequestspage from './admin/AdminPages/HospitalRequestsPage';
import HospitalRequestsPage from './admin/AdminPages/HospitalRequestsPage';
import HospitalPages from './admin/AdminPages/HospitalPages';

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/hossignup" element={<HospitalSignup />} />
            <Route path="/register/patient" element={<SignUp userType="patient" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/patient" element={<Login userType="patient" />} />
            <Route path="/hoslogin" element={<HosLogin />} />
            <Route path="/hospital" element={<Hospital />} />

            {/* Admin Side */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/overview" element={<OverViewPage />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/HospitalRequests"element={<HospitalRequestsPage/>} />
            <Route path="/Hospitals"element={<HospitalPages/>} />

            
        </Routes>
    </div>
);

export default App;
