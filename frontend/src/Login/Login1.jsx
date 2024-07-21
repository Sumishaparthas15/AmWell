import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Home/Navbar/Navbar';
import PatLoginOTP from '../Home/Home/PatLoginOTP ';
import LoginOTP from '../Home/Home/LoginOTP';

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login1 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setOtpSent(false); // Reset OTP state when role changes
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (role === 'patient') {
        await axios.post('http://localhost:8080/api/patient_login/', { email, password });
        localStorage.setItem('patientEmail', email);
        setOtpSent(true);

        await fetch('http://127.0.0.1:8080/api/generate-otp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

      } else if (role === 'hospital') {
        await axios.post('http://localhost:8080/api/hospital_login/', { email, password });
        localStorage.setItem('hospitalEmail', email);
        setOtpSent(true);

        await fetch('http://127.0.0.1:8080/api/generate-otp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        toast.success('OTP sent to your email.');
      } else if (role === 'admin') {
        const response = await axios.post('http://localhost:8080/api/admin/', { username: email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/overview');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (role === 'admin') {
        toast.error('Invalid credentials or not an admin');
      } else {
        toast.error('Invalid credentials or server error');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Toaster position='top-right' reverseOrder={false} />
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">Login</Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Select Role</FormLabel>
              <RadioGroup
                aria-label="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                row
              >
                <FormControlLabel value="patient" control={<Radio />} label="Patient" />
                <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
                <FormControlLabel value="admin" control={<Radio />} label="Admin" />
              </RadioGroup>
            </FormControl>

            {role && (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                {role === 'patient' && otpSent && <PatLoginOTP email={email} />}
                {role === 'hospital' && otpSent && <LoginOTP email={email} />}
                <Grid container>
                  <Grid item>
                    {role === 'patient' && <Link href="/register/patient/" variant="body2">{"Don't have an account? Register"}</Link>}
                    {role === 'hospital' && <Link href="/hossignup" variant="body2">{"Don't have an account? Register"}</Link>}
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login1;
