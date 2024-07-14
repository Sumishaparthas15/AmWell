import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel'


const HospitalRequests = () => {
    const [approvedHospitals, setApprovedHospitals] = useState([]);

    useEffect(() => {
        fetchApprovedHospitals();
    }, [])
    
    const fetchApprovedHospitals =async() =>{
        try{
            const response = await axios.get('http://localhost:8080/api/HospitalListView/');
            setApprovedHospitals(response.data)
        }catch (error) {
            console.error('Error fetching approved hospitals:', error);
        }

    };
    const buttonStyle = {
        backgroundColor: '#f0f0f0', // light grey background
        color: '#000', // black text
       
        borderRadius: '4px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '14px'
    };
    const buttonStyle1 ={
        backgroundColor: '#cb3e3e', 
    }

   

  return (
    <div >
       <AdminPanel/>
       <div >
      <h1>Hospitals</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Details</th>
            <th>Departments</th>
            <th>Doctors</th>
            <th>Bookings</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {approvedHospitals.map(hospital => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.hospital_name}</td>
              <td><button style={buttonStyle}>View</button></td>
              <td><button style={buttonStyle}>View</button></td>
              <td><button style={buttonStyle}>View</button></td>
              <td><button style={buttonStyle}>View</button></td>
             
              <td><button style={buttonStyle1}>Block</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default HospitalRequests