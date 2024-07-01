import React, { useEffect, useState } from 'react';
import AdminPanel from './AdminPanel'
import axios from 'axios';


const Patients = () => {
    const [patients, setPatients] = useState([])

    useEffect(() => {
        fetchPatients();
    }, [])

    const fetchPatients = async() =>{
        try{
            const response =await axios.get('http://localhost:8080/api/get_patients/')
            setPatients(response.data)
        }catch(error){
            console.log("Error fetching the patients",error)
        }

    }
    const buttonStyle1 ={
        backgroundColor: '#cb3e3e', 
    }
    
  return (
     <div >
       <AdminPanel/>
       <div >
      <h1>PATIENTS</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Image</th>
            <th>Bookings</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
            {patients.map(patient =>(
                <tr key={patient.id}>
                    <th>{patient.id}</th>
                    <th>{patient.username}</th>
                    <th>{patient.email}</th>
                    <th></th>
                    <th>{patient.profile_img}</th>
                    <th></th>
                    <th><button style={buttonStyle1}>Block</button></th>

                </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Patients