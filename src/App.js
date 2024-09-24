import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/Home_Index/Home_Navbar/NavBar';
import LoginPage from './Components/Login_Register/LoginPage';
import RegisterPage from './Components/Login_Register/RegistrationPage';
import ResetPassword from './Components/Login_Register/ResetPassword';
import ForgotPassword from './Components/Login_Register/ForgotPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from './Components/Footer/Footer';
import WebIndex from './Components/Web_Index/WebIndex';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="main-content">
        {/* Show WebIndex only if not logged in */}
        {!isLoggedIn && <WebIndex />}
        
        <main className="container mt-4"> 
          <Routes>
            {/* Use conditional rendering to show NavigationBar based on login status */}
            <Route path="/" element={<WebIndex />} /> 
            <Route path="/home" element={isLoggedIn ? <NavigationBar /> : <WebIndex />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </main>
        
        <Footer /> 
      </div>
    </Router>
  );
};

export default App;
