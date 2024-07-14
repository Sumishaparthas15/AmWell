import React from 'react';
import { Link } from 'react-router-dom';

const HospitalPanel = () => {
    const styles = {
        department_items: {
            marginLeft: '20px',
        },
        admin_container: {
            width: '250px',
            backgroundColor: 'rgb(40, 155, 145)',
            padding: '20px',
            position: 'fixed',
            height: '100vh',
            overflowY: 'auto',
            zIndex: 999,
        },
    };

    const handleLogout = () => {
        fetch('http://localhost:8080/api/hospital_logout/', {
            method: 'POST',
            credentials: 'include', // Important for session-based authentication
        })
        .then(response => {
            if (response.ok) {
                console.log('Logout successful');
                window.location.href = '/hospital_login'; // Redirect after logout
            } else {
                throw new Error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
    };
    
    

    return (
        <div>
            <div className='admin_container' style={styles.admin_container}>
                <div class="admin-sidebar">
                    <div class="sidebar-header">
                        <h3>MedLink</h3>
                    </div>
                    <br></br>
                    <ul class="sidebar-menu">
                        <Link to='/hospital_departments' className="navbar-brand">Departments</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/doctors' className="navbar-brand">Doctors</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/hospital_bookings' className="navbar-brand">Bookings</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/HospitalRequests' className="navbar-brand">Patients</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/hospital_complaints' className="navbar-brand">Complaints</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/hospital_profile' className="navbar-brand">Profile</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <button onClick={handleLogout} className="navbar-brand">Logout</button>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HospitalPanel;
