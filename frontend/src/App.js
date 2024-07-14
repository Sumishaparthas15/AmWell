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
            <Route path="/hospital_login" element={<HosLogin />} />
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/hospitalView" element={<HospitalViewPage />} />
            <Route path="/hospital_departments" element={<HosDepPage />} />


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
