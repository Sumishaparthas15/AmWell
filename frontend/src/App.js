import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Home/HomePage';

import SignUp from './Home/Home/SignUp';
import HosSignUp from './Home/Home/HosSignUp'; // Fixing the component import
import Login from './Home/Home/Login';
import HosLogin from './Home/Home/HosLogin'; // Fixing the component import
import AdminLoginPage from './admin/AdminPages/AdminLoginPage';
import OverViewPage from './admin/AdminPages/OverViewPage';
import PatientPage from './admin/AdminPages/PatientPage';



import HospitalRequestsPage from './admin/AdminPages/HospitalRequestsPage';
import HospitalPages from './admin/AdminPages/HospitalPages';
import HospitalViewPage from './Hospital/HosPages/HospitalViewPage';
import HosDepPage from './Hospital/HosPages/HosDepPage';
import Hospital from './Home/Home/Hospital';
import Bookup from './Patients/PatComponents/Bookup';

import OTPVerification from './Home/Home/OTPVerification';
import HospiAdditional from './Home/Home/HospiAdditional';
import LoginOTP from './Home/Home/LoginOTP';
import HospitalDepartment from './Hospital/HosComponents/HospitalDepartment';
import HospitalProfile from './Hospital/HosComponents/HospitalProfile';

const App = () => (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            
            


            {/* PATIENT */}

            <Route path="/register/patient" element={<SignUp  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/bookup" element={<Bookup />} />
            


            
            {/* HOSPITAL */}

            <Route path="/hossignup" element={<HosSignUp />} />
            <Route path="/otpsignup" element={<OTPVerification />} />
            <Route path="/hospiAdditional" element={<HospiAdditional />} />
            <Route path="/hospital_login" element={<HosLogin />} />
            <Route path="/otp_login" element={<LoginOTP />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/hospitalView" element={<HospitalViewPage />} />
            <Route path="/hospital_departments" element={<HospitalDepartment />} />
            <Route path="/hospital_profile" element={<HospitalProfile />} />


            {/* ADMIN */}
            
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/overview" element={<OverViewPage />} />
            <Route path="/patients" element={<PatientPage />} />
            <Route path="/HospitalRequests"element={<HospitalRequestsPage/>} />
            <Route path="/Hospitals"element={<HospitalPages/>} />

            
        </Routes>
    </div>
);


export default App;
