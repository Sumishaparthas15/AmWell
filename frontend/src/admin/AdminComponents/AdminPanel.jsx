import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const AdminPanel = () => {
    const styles={
        department_items:{
            marginLeft: '20px',
        },
        admin_container:{
            width: '250px',
            backgroundColor: 'rgb(40, 155, 145)',
            padding: '20px',
            position: 'fixed', // Fix position
            height: '100vh', // Set height to full viewport height
            overflowY: 'auto', // Enable vertical scrolling if needed
            zIndex: 999,
            
        },
       

    }
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

  return (
    <div>
        <div className='admin_container' style={styles.admin_container}>
            <div class="admin-sidebar">
                 <div class="sidebar-header">
                            <h3>Am Well</h3>
                 </div>
                 <br></br>
                    <ul class="sidebar-menu">
                        <Link to='overview' className="navbar-brand">OverView</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/patients' className="navbar-brand">Patients</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/Hospitals' className="navbar-brand">Hospitals</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/HospitalRequests' className="navbar-brand">Hospital Requests </Link>
                    </ul>
                    
                    <ul class="sidebar-menu">
                        <Link to='/Status' className="navbar-brand">Block & Unblock</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/Complaints' className="navbar-brand">Complaints</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/Feedback' className="navbar-brand">Feedback</Link>
                    </ul>
                    <ul class="sidebar-menu">
                        <Link to='/Premium' className="navbar-brand">Premium</Link>
                    </ul>

                    
                    
            </div>

        </div>
        
   </div>
  )
}

export default AdminPanel