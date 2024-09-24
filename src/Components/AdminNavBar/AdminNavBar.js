// src/components/AdminNavBar.js
import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Content from './Content';
import './AdminNavBar.css';

const AdminNavBar = () => {
  const [activeSidebar, setActiveSidebar] = useState('');
  const [activeContent, setActiveContent] = useState('');

  const handleNavClick = (sidebarId) => {
    setActiveSidebar(sidebarId);
    setActiveContent(''); // Reset content when switching sidebars
  };

  const handleOptionClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div>
      <Navbar className="admin-navbar" fixed='top'>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav-admin" />
          <Navbar.Collapse id="navbar-nav-admin">
            <Nav className="nav-link-admin">
              <Nav.Link onClick={() => handleNavClick('Applications')}>Applications</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('Projects')}>Projects</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('Issues')}>Issues</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('Manage apps')}>Manage apps</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('User management')}>User management</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('System')}>System</Nav.Link>
              <Nav.Link onClick={() => handleNavClick('ScriptRunner')}>ScriptRunner</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="app">
        <Sidebar activeSidebar={activeSidebar} onOptionClick={handleOptionClick} />
        <Content activeContent={activeContent} />
      </div>
    </div>
  );
};

export default AdminNavBar;