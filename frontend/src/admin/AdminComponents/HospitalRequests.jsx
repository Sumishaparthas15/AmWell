import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminPanel from './AdminPanel'
import './css/HospitalRequests.css'

const HospitalRequests = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        // axios.get('/api/hospital_requests/')
        axios.get('http://localhost:8080/api/hospital_requests/')
        .then(response => {
            setHospitals(response.data);
          })
          .catch(error => {
            console.error('There was an error fetching the hospital requests!', error);
          });
      
    }, [])
    
    const approveHospital =(id) =>{
        // axios.post(`/api/approve_hospital/${id}/`)
        axios.post(`http://localhost:8080/api/approve_hospital/${id}/`)
        .then(response => {
          setHospitals(hospitals.filter(hospital => hospital.id !== id));
        })

        
        .catch(error =>{
            console.error('There was an error approving the hospital!', error);
        })

    }

  return (
    <div >
       <AdminPanel/>
       <div >
      <h1>Hospital Requests</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>District</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(hospital => (
            <tr key={hospital.id}>
              <td>{hospital.id}</td>
              <td>{hospital.hospital_name}</td>
              <td>{hospital.email}</td>
              <td>{hospital.phone_number}</td>
              <td>{hospital.address}</td>
              <td>{hospital.district}</td>
              <td> <img src={`http://localhost:8080${hospital.photo}`} alt={`${hospital.hospital_name}`} style={{ width: '100px', height: 'auto' }}  /></td>
              
              <td>
                <button onClick={() => approveHospital(hospital.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default HospitalRequests