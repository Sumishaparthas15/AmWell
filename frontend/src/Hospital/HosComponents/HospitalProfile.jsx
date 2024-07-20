import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HospitalProfile = () => {
    const [hospitalData, setHospitalData] = useState(null);

    useEffect(() => {
        const fetchHospitalData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/hospital/');
                if (response.status === 200) {
                    setHospitalData(response.data);
                } else {
                    console.error('Failed to fetch hospital data');
                }
            } catch (error) {
                console.error('Error fetching hospital data:', error);
            }
        };

        fetchHospitalData();
    }, []);

    return (
        <div>
            {hospitalData ? (
                <div>
                    <h2>{hospitalData.hospital_name}</h2>
                    <p>Email: {hospitalData.email}</p>
                    <p>Phone Number: {hospitalData.phone_number}</p>
                    <p>Address: {hospitalData.address}</p>
                    {/* Add more fields as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HospitalProfile;
