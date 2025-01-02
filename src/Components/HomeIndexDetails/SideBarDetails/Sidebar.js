import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
// Import the JSON file
import { sidebarLinks } from '../../com_index'; // Adjust the path to your JSON file
import '../MainHomeLayout.scss';

const Sidebar = ({ selectedOption, setActiveComponent, projectId }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [sideBarLinks, setSideBarLinks] = useState([]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Fetch the links for the selected option
        if (sidebarLinks[selectedOption]) {
            const links = sidebarLinks[selectedOption].map((link) => ({
                ...link,
                path: link.path.replace('${projectId}', projectId || '') // Replace dynamic parts if needed
            }));
            setSideBarLinks(links);
        }
    }, [selectedOption, projectId]);

    return (
        <div className="sidebar-content-container">
            <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
                {isOpen && (
                    <nav className="sidebar-links">
                        {sideBarLinks.map((option) => (
                            <NavLink
                                key={option.key}
                                to={option.path}
                                className="nav-link"
                                activeClassName="active"
                                onClick={() => setActiveComponent(option.key)}
                            >
                                {option.label}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpen ? faChevronLeft : faBars} />
            </button>
            <div className={`content-area ${isOpen ? '' : 'collapsed'}`}>
                {/* Content goes here */}
            </div>
        </div>
    );
};

export default Sidebar;
