import React, { useState } from 'react';
import './Login_Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser_API } from '../api_index';
import { Notification } from '../com_index';

const LoginPage = ({ onLogin }) => {

  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const showNotification = (message) => {
    setNotification(message);

    const timer = setTimeout(() => {
      setNotification('');
    }, 3000);

    return () => clearTimeout(timer);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const userdata = {
      userNameOrEmailAddress,
      password
    }

    console.log({ userNameOrEmailAddress, password });

    try {
      setLoading(true);
      console.log('API response:', userdata);

      const response = await LoginUser_API(userdata);
      console.log('API response:', response.result);

      if (response.isSuccess === 1) {
        let userName = response.result.userName;
        onLogin(userName);
        navigate('/home');
        showNotification(response.message);
        console.log('Success message:', response.message);
      } else {
        showNotification(response.message);
        console.log('Error message:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error updating ticket type:', error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="login-register-container">

      {notification && (<Notification message={notification} />)}
      {loading && <div className="loading-indicator">Loading...</div>}

      <h3 align='center' style={{ color: '#0052cc' }} ><b>Login</b></h3>
      <form className="login-register-form login-register-text-label" onSubmit={handleSubmit}>

        <div className="login-register-form-group">
          <label htmlFor="email">Email or Username</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email or username"
            value={userNameOrEmailAddress}
            onChange={(e) => setUserNameOrEmailAddress(e.target.value)}
            required
          />
        </div>

        <div className="login-register-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-register-submit-button">Log In</button>

        <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em' }}>
          <Link to="/register">Don't have an account? Register</Link>
          <br />
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
