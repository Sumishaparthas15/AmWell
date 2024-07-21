import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import HospitalPanel from './HospitalPanel';

const HospitalDoctors = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [image, setImage] = useState(null);
  const [experience, setExperience] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [open, setOpen] = useState(false);

  // Fetch departments from API on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/doctors/');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('department', department);
    formData.append('name', name);
    formData.append('age', age);
    formData.append('sex', sex);
    formData.append('image', image);
    formData.append('experience', experience);

    try {
      await axios.post('http://localhost:8080/api/doctors/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Doctor added successfully!');
      setOpen(false);
      // Refresh doctor list
      const response = await axios.get('http://localhost:8080/api/doctors/');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Error adding doctor');
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <HospitalPanel />
    
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Hospital Doctors
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{ mt: 3 }}
        >
          Add Doctor
        </Button>
        <List sx={{ width: '100%', mt: 3 }}>
          {doctors.map((doctor) => (
            <ListItem key={doctor.id}>
              <ListItemAvatar>
                <Avatar src={doctor.image} />
              </ListItemAvatar>
              <ListItemText
                primary={doctor.name}
                secondary={`Age: ${doctor.age}, Sex: ${doctor.sex}, Department: ${doctor.department}, Experience: ${doctor.experience} years`}
              />
            </ListItem>
          ))}
        </List>

        {/* Modal Form */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Doctor</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  label="Department"
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Doctor's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="age"
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="sex-label">Sex</InputLabel>
                <Select
                  labelId="sex-label"
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  label="Sex"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Avatar
                  src={imagePreview}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="experience"
                label="Experience (years)"
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="doctor-form">Add Doctor</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
    </div>
  );
};

export default HospitalDoctors;
