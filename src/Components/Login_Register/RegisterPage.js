import React, { useState } from 'react';
import './Login_Register.scss';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterUser_API } from '../api_index';
import { Notification } from '../com_index';


const RegisterPage = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate(); // Initialize useNavigate

  const showNotification = (message) => {
    setNotification(message);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registering:', { firstName, lastName, emailAddress, password, userName });

    const userdata = {
      userName,
      password,
      emailAddress,
      firstName,
      lastName
    }

    try {
      setLoading(true);
      console.log('API response:', userdata);

      const response = await RegisterUser_API(userdata);

      console.log('API response:', response.result);

      if (response.isSuccess === 1) {
        showNotification(response.message);
        console.log('Success message:', response.message);
        navigate('/login');
      } else {
        showNotification(response.message);
        console.log('Error message:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error updating ticket type:', error);
    } finally {
      setLoading(false);
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Redirect to the login page after registration
  };

  return (
    <>
      <div className="login-register-container">
        <h3 align='center' style={{ color: '#0052cc' }} ><b>Create Account</b></h3>

        {notification && (<Notification message={notification} />)}
        {loading && <div className="loading-indicator">Loading...</div>}

        <form className="login-register-form login-register-text-label" onSubmit={handleSubmit}>

          <div className="login-register-form-group">
            <label htmlFor="email">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className="login-register-form-group ">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="login-register-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="login-register-form-group">
            <label htmlFor="email">EmailAddress</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your EmailAddress"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
            />
          </div>

          <div className="login-register-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-register-submit-button">Register</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em' }}>
          <Link to="/login">Already have an account? Log In</Link>
        </div>

      </div>
    </>
  );
};

export default RegisterPage;
