import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Home as HomeIcon, AccountCircle } from '@mui/icons-material';

const PatPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('patientEmail');
    if (!storedEmail) {
      navigate('/LOGIN'); // Redirect to login if no email is found
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('patientEmail');
    navigate('/LOGIN');
  };

  const styles = {
    appContainer: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
    },
    sidebar: {
      width: '250px',
      backgroundColor: 'rgb(40, 155, 145)',
      padding: '20px',
      position: 'fixed',
      top: '64px', // Adjust based on the height of the AppBar
      left: 0,
      height: 'calc(100vh - 64px)', // Ensure full height minus top-bar height
      overflowY: 'auto',
    },
    mainContent: {
      marginLeft: '250px', // Adjust based on the width of the sidebar
      marginTop: '64px', // Adjust based on the height of the AppBar
      padding: '20px',
      height: 'calc(100vh - 64px)', // Ensure full height minus top-bar height
      overflowY: 'auto',
    },
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '64px', // Reduce the height of the AppBar
    },
    appBar: {
      zIndex: 1201,
      backgroundColor: 'rgb(40, 155, 145)',
      height: '64px', // Reduce the height of the AppBar
    },
    sidebarUserInfo: {
      marginBottom: '20px',
      textAlign: 'center',
    },
    sidebarUserInfoName: {
      margin: 0,
      fontSize: '1.2em',
    },
    sidebarUserInfoRole: {
      margin: 0,
      color: '#666',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      width: '100%',
    },
    navItem: {
      padding: '10px',
      backgroundColor: '#e0e0e0',
      marginBottom: '5px',
      textAlign: 'center',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    navItemHover: {
      backgroundColor: '#d0d0d0',
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  };

  return (
    <div style={styles.appContainer}>
      <AppBar position="fixed" style={styles.appBar}>
        <Toolbar style={styles.flexContainer}>
          <Typography variant="h4" style={{ flexGrow: 1 }}>
            MedLink
          </Typography>
          <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/hospitalView')}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{email}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <aside style={styles.sidebar}>
        <div style={styles.sidebarUserInfo}>
          <h2 style={styles.sidebarUserInfoName}>{email}</h2>
          <p style={styles.sidebarUserInfoRole}>Patient</p>
        </div>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <Link to="/bookop" style={styles.link}>Book OP</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/op-history" style={styles.link}>OP History</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/revisit-status" style={styles.link}>Revisit Status</Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/change-profile" style={styles.link}>Change Profile</Link>
            </li>
            <li style={styles.navItem} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      <main style={styles.mainContent}>
        <Outlet /> {/* This will render the child routes */}
      </main>
    </div>
  );
};

export default PatPanel;
