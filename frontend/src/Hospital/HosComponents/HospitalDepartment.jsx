import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HospitalPanel from './HospitalPanel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const HospitalDepartment = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [hospitalData, setHospitalData] = useState({
        name: '',
        image: null,
    });
    const [hospitalEmail, setHospitalEmail] = useState('');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem('hospitalEmail');
        if (email) {
            setHospitalEmail(email);
            fetchDepartments(email);
        }
    }, []);

    const fetchDepartments = async (email) => {
        try {
            const url = `http://localhost:8080/api/departments/${encodeURIComponent(email)}/`;
            const response = await axios.get(url);
            setDepartments(response.data);
        } catch (error) {
            console.error('Failed to fetch departments', error);
            toast.error('Failed to fetch departments');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHospitalData({ ...hospitalData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setHospitalData({ ...hospitalData, [name]: files[0] });
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        Object.keys(hospitalData).forEach(key => {
            formData.append(key, hospitalData[key]);
        });
    
        try {
            const url = `http://localhost:8080/api/departments/${encodeURIComponent(hospitalEmail)}/create/`;
            await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Department added successfully!');
            fetchDepartments(hospitalEmail);
            toggleModal();
        } catch (error) {
            console.error('Failed to submit the form', error);
            // toast.error('Failed to submit the form');
        }
    };

    return (
        <div>
            <HospitalPanel />
            <Toaster />
            <div className="department-container" style={styles.departmentContainer}>
                <div className="header" style={styles.header}>
                    <h1>Departments</h1>
                    <button className="button1" style={styles.button1} onClick={toggleModal}>Add Department</button>
                </div>
                <div className="department-cards" style={styles.departmentCards}>
                    {departments.map(department => (
                        <div className="department-card" key={department.id} style={styles.departmentCard}>
                            <img src={`http://localhost:8080${department.image}`} alt={department.name} style={styles.image} />
                            <h5 className="department-name" style={styles.departmentName}>{department.name}</h5>
                        </div>
                    ))}
                </div>
            </div>
            {modalOpen && (
                <div className="modal" style={styles.modal}>
                    <div className="modal-content" style={styles.modalContent}>
                        <h2>Add Department</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Department Name"
                                required
                                value={hospitalData.name}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                            <input
                                type="file"
                                name="image"
                                required
                                onChange={handleFileChange}
                                style={styles.input}
                            />
                            <div className="modal-buttons" style={styles.modalButtons}>
                                <button type="submit" className="button1" style={styles.button1}>OK</button>
                                <button type="button" className="button2" style={styles.button2} onClick={toggleModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    departmentContainer: {
        padding: '20px',
        marginLeft: '300px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    button1: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    departmentCards: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    departmentCard: {
        width: '200px',
        margin: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        height: '140px',
        objectFit: 'cover',
    },
    departmentName: {
        textAlign: 'center',
        padding: '10px 0',
    },
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button2: {
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default HospitalDepartment;
