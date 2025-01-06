import React, { useState } from 'react';
import EmployerList from './EmployerList.jsx';
import ApplicantList from './ApplicantList.jsx';
import Navs from './Layout/navs.jsx';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track whether the user is logged in
  const [username, setUsername] = useState(''); // State to store the username
  const [password, setPassword] = useState(''); // State to store the password

  const handleLogin = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'pass123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '10px',
          width: '300px',
          backgroundColor: '#fff'
        }}>
          <h1 style={{ fontSize: '36px' }}>Admin Login</h1>
          <form onSubmit={handleLogin} style={{textAlign:"center"}}>
            <label style={{ fontSize: '24px' }}>Username:</label>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} style={{ fontSize: '24px', padding: '5px', width: '200px' }} />
            <br />
            <label style={{ fontSize: '24px' }}>Password:</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ fontSize: '24px', padding: '5px', width: '200px' }} />
            <br />
            <button type="submit"  style={{
                                backgroundColor: '#ff4d4f',
                                color: 'white',
                                border: 'none',
                                padding: '10px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}>
                Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* <Navs /> */}
    <button onClick={handleLogout} style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: '#ff4d4f',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      cursor: 'pointer',
    }}>
      Logout
    </button>
    <div style={{ fontSize: '24px', padding: '20px' }}>
      <h1 style={{ fontSize: '36px' }}>Admin Dashboard</h1>
      <ApplicantList />
      <EmployerList />
    </div>
    </>
  );
};

export default Admin;