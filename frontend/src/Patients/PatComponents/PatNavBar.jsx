import React from 'react';
import { Link } from 'react-router-dom';

const PatNavBar = () => {
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
  return (
    <div>
    <div className='admin_container' style={styles.admin_container}>
        <div class="admin-sidebar">
            <div class="sidebar-header">
                <h3>MedLink</h3>
            </div>
            <br></br><br></br><br></br>
            <ul class="sidebar-menu">
                <Link to='/bookup' className="navbar-brand">Bookup</Link>
            </ul>
            <ul class="sidebar-menu">
                <Link to='/op_history' className="navbar-brand">Op History</Link>
            </ul>
            <ul class="sidebar-menu">
                <Link to='/patient_profile' className="navbar-brand">Change Profile</Link>
            </ul>
           
            <ul class="sidebar-menu">
                <button className="navbar-brand">Logout</button>
            </ul>
        </div>
    </div>
</div>
  )
}

export default PatNavBar