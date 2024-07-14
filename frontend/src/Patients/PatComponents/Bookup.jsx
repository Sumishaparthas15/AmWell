import React from 'react'
import PatNavBar from './PatNavBar'
import { Link } from 'react-router-dom';

const Bookup = () => {
    const styles = {
        admin_container: {
            width: '250px',
            backgroundColor: 'rgb(40, 155, 145)',
            padding: '20px',
            position: 'fixed',
            height: '100vh',
            overflowY: 'auto',
            zIndex: 999,
            color: 'white',
        },
        sidebarHeader: {
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '10px',
        },
        sidebarMenu: {
            listStyleType: 'none',
            padding: 0,
            marginBottom: '20px',
        },
        sidebarLink: {
            color: 'white',
            textDecoration: 'none',
            display: 'block',
            padding: '10px 0',
            fontSize: '18px',
            textAlign: 'center',
        },
        selectionContainer: {
            padding: '20px',
            marginLeft: '250px',
            marginTop: '20px',
        },
        selectionBox: {
            marginBottom: '20px',
        },
        selectionLabel: {
            display: 'block',
            marginBottom: '5px',
            fontSize: '16px',
        },
        selectionInput: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
        },
    };

  return (
    <div>
          <PatNavBar />
        <div>
        <div>
            <div className='admin_container' style={styles.admin_container}>
                <div className="admin-sidebar">
                    <div className="sidebar-header" style={styles.sidebarHeader}>
                        <h3>MedLink</h3>
                    </div>
                    <ul className="sidebar-menu" style={styles.sidebarMenu}>
                        <li>
                            <Link to='/bookup' style={styles.sidebarLink}>Bookup</Link>
                        </li>
                        <li>
                            <Link to='/op_history' style={styles.sidebarLink}>Op History</Link>
                        </li>
                        <li>
                            <Link to='/patient_profile' style={styles.sidebarLink}>Change Profile</Link>
                        </li>
                        <li>
                            <button style={{ ...styles.sidebarLink, background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={styles.selectionContainer}>
                <div style={styles.selectionBox}>
                    <label style={styles.selectionLabel} htmlFor="location">Location</label>
                    <select id="location" name="location" style={styles.selectionInput}>
                        <option value="new_york">Palakkad</option>
                        <option value="los_angeles">Thrissur</option>
                        <option value="chicago">Malappuram</option>
                        <option value="houston">Kozhikode</option>
                    </select>
                </div>
                <div style={styles.selectionBox}>
                    <label style={styles.selectionLabel} htmlFor="hospital">Hospital</label>
                    <select id="hospital" name="hospital" style={styles.selectionInput}>
                        <option value="hospital_a">Nila</option>
                        <option value="hospital_b">Alshifa</option>
                        <option value="hospital_c">Ansar</option>
                    </select>
                </div>
                <div style={styles.selectionBox}>
                    <label style={styles.selectionLabel} htmlFor="department">Department</label>
                    <select id="department" name="department" style={styles.selectionInput}>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                    </select>
                </div>
                <div style={styles.selectionBox}>
                    <label style={styles.selectionLabel} htmlFor="doctor">Doctor</label>
                    <select id="doctor" name="doctor" style={styles.selectionInput}>
                        <option value="dr_smith">Dr. Smith</option>
                        <option value="dr_jones">Dr. Jones</option>
                        <option value="dr_davis">Dr. Davis</option>
                        <option value="dr_clark">Dr. Clark</option>
                    </select>
                </div>
            </div>
        </div>
        </div>
    // </div>
  )
}

export default Bookup