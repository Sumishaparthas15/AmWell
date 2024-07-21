import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import dr from '../../images/hos5.jpg';
import OTPVerification from './OTPVerification';

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

const HosSignUp = () => {
  const navigate = useNavigate();

  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const signupSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (hospitalName.trim() === "") {
      toast.error("Please enter hospital name");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Enter a valid Email Id");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords didn't match!");
      return;
    } else if (password.length < 6) {
      toast.error("Password should contain at least six characters!");
      return;
    }

    const formData = new FormData();
    formData.append('hospital_name', hospitalName);
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await fetch('http://127.0.0.1:8080/api/hossignup/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (response.status === 400) {
        toast.error('Username or Email id already exist!');
        navigate('/hossignup');
      } else {
        toast.success("User Registered successfully! OTP sent to your email.");
        setOtpSent(true);
        localStorage.setItem('hospitalEmail', email); 
        await fetch('http://127.0.0.1:8080/api/generate-otp/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
      }
    } catch (err) {
      console.error("Some error occurred:", err);
      toast.error("Some error occurred, please try again later!");
      navigate('/hossignup');
    }
  };

  return (
    <div style={{ 
      backgroundImage: `url(${dr})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Toaster position='top-right' reverseOrder={false} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            {!otpSent ? (
              <Box component="form" noValidate onSubmit={signupSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="hospitalName"
                      required
                      fullWidth
                      id="hospitalName"
                      label="Hospital Name"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/hospital_login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <OTPVerification email={email} />
            )}
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default HosSignUp;
