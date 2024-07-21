import React, { useState, useEffect } from 'react';
import PatPanel from './PatPanel'

function Bookup() {
  const [form, setForm] = useState({
    district: '',
    hospital: '',
    department: '',
    doctor: '',
    optime: '',
    timeslot: '',
  });
  const [districts, setDistricts] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch districts from the Django backend
    fetch('http://localhost:8080/api/districts/')
      .then(response => response.json())
      .then(data => setDistricts(data.districts || []))
      .catch(error => console.error('Error fetching districts:', error));
  }, []);

  useEffect(() => {
    if (form.district) {
      // Fetch hospitals when district changes
      fetch(`http://localhost:8080/api/hospitals/${form.district}/`)
        .then(response => response.json())
        .then(data => setHospitals(data.hospitals || []))
        .catch(error => console.error('Error fetching hospitals:', error));
    } else {
      setHospitals([]);
    }
  }, [form.district]);

  useEffect(() => {
    if (form.hospital) {
      // Fetch departments when hospital changes
      const encodedHospitalName = encodeURIComponent(form.hospital);
      fetch(`http://localhost:8080/api/departments/${encodedHospitalName}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setDepartments(data.departments || []))
        .catch(error => console.error('Error fetching departments:', error));
    } else {
      setDepartments([]);
    }
  }, [form.hospital]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const styles = {
    container: {
      marginLeft: '250px',
      marginTop: '20px',
      padding: '20px',
    },
    formContainer: {
      width: '50%',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    select: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: 'rgb(40, 155, 145)',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div>
      <PatPanel />
    <div style={styles.container}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            District:
            <select name="district" value={form.district} onChange={handleChange} style={styles.select}>
              <option value="">Select District</option>
              {districts.length > 0 ? (
                districts.map((district, index) => (
                  <option key={index} value={district}>{district}</option>
                ))
              ) : (
                <option value="">No districts available</option>
              )}
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Hospital:
            <select name="hospital" value={form.hospital} onChange={handleChange} style={styles.select}>
              <option value="">Select Hospital</option>
              {hospitals.length > 0 ? (
                hospitals.map((hospital, index) => (
                  <option key={index} value={hospital}>{hospital}</option>
                ))
              ) : (
                <option value="">No hospitals available</option>
              )}
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Department:
            <select name="department" value={form.department} onChange={handleChange} style={styles.select}>
              <option value="">Select Department</option>
              {departments.length > 0 ? (
                departments.map((department, index) => (
                  <option key={index} value={department.name}>{department.name}</option>
                ))
              ) : (
                <option value="">No departments available</option>
              )}
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Doctor:
            <select name="doctor" value={form.doctor} onChange={handleChange} style={styles.select}>
              <option value="">Select Doctor</option>
              {/* Add options dynamically as needed */}
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            OP Time:
            <select name="optime" value={form.optime} onChange={handleChange} style={styles.select}>
              <option value="">Select OP Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </select>
          </label>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>
            Time Slot:
            <select name="timeslot" value={form.timeslot} onChange={handleChange} style={styles.select}>
              <option value="">Select Time Slot</option>
              <option value="slot1">10:00 AM - 10:30 AM</option>
              <option value="slot2">10:30 AM - 11:00 AM</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <button type="submit" style={styles.button}>OK</button>
      </form>
    </div>
    </div>
  );
}

export default Bookup
