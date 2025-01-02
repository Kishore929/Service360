import React, { useState, useEffect } from 'react';
import { NavDropdown, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Dashboard from '../../Home_NavBar_Labels/DashBoards';
import Project from '../../Home_NavBar_Labels/Projects';
import Ticket from '../../Home_NavBar_Labels/Tickets';
import Boards from '../../Home_NavBar_Labels/Boards';
import Plans from '../../Home_NavBar_Labels/Plans';
import Assets from '../../Home_NavBar_Labels/Assets';
import SearchBar from '../../Home_NavBar_Labels/SearchBar';
import './HomeNavbar.scss'; // Import CSS for styling

const HomeNavbar = ({ selectOption }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const handleResize = () => {
        setIsMobileView(window.innerWidth < 992); // Check for mobile view
    };

    const handleSubmit = (e, action) => {
        e.preventDefault();
        if (action === 'display') {
          navigate('display'); 
        } 
      };

    useEffect(() => {
        handleResize(); // Check initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const adminOptions = [
        { action: 'Modify Users', label: 'Modify Users', path: '/home/modifyUsers' }, // Add path
        { action: 'Manage Users', label: 'Manage Users', path: '/home/manageUsers' },
        { action: 'Projects', label: 'Projects', path: '/home/projects' }, // Add path
        { action: 'Admin Settings', label: 'Admin Settings', path: '/home/adminSettings' }, // Add path
        { action: 'Global Settings', label: 'Global Settings', path: '/home/globalSettings' }, // Add path
    ];

    const userOptions = [
        { action: 'Profile', label: 'Profile', path: '/profile' }, // Add path
        { action: 'Logout', label: 'Logout', path: '/logout' }, // Add path
    ];

    const navLinks = [
        { href: "#dashboard", label: <Dashboard /> },
        { href: "#project", label: <Project /> },
        { href: "#ticket", label: <Ticket /> },
        { href: "#boards", label: <Boards /> },
        { href: "#plans", label: <Plans /> },
        { href: "#assets", label: <Assets /> },
    ];

    const handleClick = (action, path) => {
        selectOption(action);
        navigate(path); // Navigate to the specified path
        console.log(`${action} clicked`);
    };

    const renderDropdownItems = (options) => {
        return options.map(option => (
            <NavDropdown.Item key={option.action} onClick={() => handleClick(option.action, option.path)}>
                {option.label}
            </NavDropdown.Item>
        ));
    };

    return (
        <Navbar className="customNavbar-home-navbar" expand="lg" fixed="top">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Navbar.Brand href="/home" className="text-white">Service360</Navbar.Brand>

                    {!isMobileView && navLinks.map((link, index) => (
                        <Nav.Link key={index} href={link.href} className='customNavbar-nav-link'>
                            {link.label}
                        </Nav.Link>
                    ))}

                    {isMobileView && (
                        <NavDropdown
                            title="More"
                            style={{ color: 'white' }} 
                            id="more-dropdown"
                            align="end"
                            drop="down"
                            className="p-0 customNavbar-icon-dropdown ms-2 nav-dropdown"
                        >
                            {navLinks.map((link, index) => (
                                <NavDropdown.Item
                                    className={isMobileView ? "customNavbar-dropdown-item-custom" : ""}
                                    key={index}
                                    href={link.href}
                                    onClick={() => handleClick(link.href)}
                                >
                                    {link.label}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    )}

                    {!isMobileView && (
                        <Button className="customNavbar-home-navbar-button" onClick={(e) => handleSubmit(e, 'display')}>Create</Button>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    {!isMobileView && (
                        <SearchBar />
                    )}
                    {isMobileView && (
                        <Nav.Link className="customNavbar-icon-container" onClick={() => handleClick('Search', '/search')}>
                            <i className="bi bi-search"></i>
                        </Nav.Link>
                    )}
                    <Nav.Link className="customNavbar-icon-container" onClick={() => handleClick('Notifications', '/notifications')}>
                        <i className="bi bi-bell"></i>
                    </Nav.Link>

                    <Nav.Link className="customNavbar-icon-container" onClick={() => handleClick('Help', '/help')}>
                        <i className="bi bi-question-circle"></i>
                    </Nav.Link>

                    <NavDropdown
                        title={<div className="customNavbar-icon-container"><i className="bi bi-sliders"></i></div>}
                        id="admin-dropdown"
                        align="end"
                        drop="down"
                        className="p-0 customNavbar-icon-dropdown"
                    >
                        {renderDropdownItems(adminOptions)}
                    </NavDropdown>

                    <NavDropdown
                        title={<div className="customNavbar-profile-icon"><i className="bi bi-person"></i></div>}
                        id="user-dropdown"
                        align="end"
                        drop="down"
                        className="p-0 customNavbar-icon-dropdown"
                        flip
                    >
                        {renderDropdownItems(userOptions)}
                    </NavDropdown>
                </div>
            </Container>
        </Navbar>
    );
};

export default HomeNavbar;
