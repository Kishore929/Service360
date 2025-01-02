import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WebNavbar.scss';
import { useNavigate } from 'react-router-dom';

const WebIndex = () => {
  const navigate = useNavigate();

  // Updated handleSubmit to handle only navigation
  const handleSubmit = (e, action) => {
    e.preventDefault();
    if (action === 'login') {
      navigate('/login'); // Navigate to the Login page
    } else if (action === 'signup') {
      navigate('/register'); // Navigate to the Signup page
    }
  };

  return (
    <>
      <Navbar className="web-index-navbar" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">Service360</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-white me-auto">
              <Nav.Link href="#dashboard" className="text-white">Dashboard</Nav.Link>
            </Nav>
            <div className="web-index-d-flex">
              <button
                type="button"
                className="web-index-buttons"
                onClick={(e) => handleSubmit(e, 'login')} // OnClick to navigate to login
              >
                LogIn
              </button>
              <button
                type="button"
                className="web-index-buttons"
                onClick={(e) => handleSubmit(e, 'signup')} // OnClick to navigate to signup
              >
                SignUp
              </button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default WebIndex;
