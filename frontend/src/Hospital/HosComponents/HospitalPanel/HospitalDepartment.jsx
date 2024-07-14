import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalPanel from './HospitalPanel';
import '../../Css/HospitalDepartments.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const HospitalDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState({ name: '', image: null });
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []); // Fetch departments on initial render
    
    const fetchDepartments = () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8080/api/departments/', {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
        }
    };
    

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewDepartment({ ...newDepartment, image: files[0] });
        } else {
            setNewDepartment({ ...newDepartment, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newDepartment.name);
        formData.append('image', newDepartment.image);
    
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
        };
    
        axios.post('http://localhost:8080/api/departments/', formData, { headers })
            .then((response) => {
                setDepartments([...departments, response.data]);
                setNewDepartment({ name: '', image: null });
                setModalOpen(false); // Close modal on success
            })
            .catch((error) => {
                console.error('Error adding department:', error);
                if (error.response) {
                    console.error('Server responded with:', error.response.data);
                    console.error('Status code:', error.response.status);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            });
    };
    
    
    

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <HospitalPanel />
            <div className="department-container">
                <div className="header">
                    <h1>Departments</h1>
                    <button onClick={toggleModal} className="button1">Add Department</button>
                </div>
                <div className="department-cards">
                    {departments.map((department) => (
                        <div key={department.id} className="department-card">
                            <img src={`http://localhost:8080${department.image}`} alt={department.name} style={{ width: '100%', height: '140px' }} />
                            <h5 className="department-name">{department.name}</h5>
                            {/* Add edit and delete functionality as needed */}
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal for adding new department */}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Department</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={newDepartment.name}
                                onChange={handleChange}
                                placeholder="Department Name"
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit" className="button1">OK</button>
                                <button type="button" onClick={toggleModal} className="button2">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HospitalDepartment;
