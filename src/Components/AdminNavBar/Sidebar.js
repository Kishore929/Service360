// src/components/Sidebar.js
import React from 'react';
import Projects from './AdminLabels/Projects';
import './AdminNavBar.css';

const Sidebar = ({ activeSidebar, onOptionClick }) => {
  const renderSidebarOptions = () => {
    switch (activeSidebar) {
      case 'Applications':
        return (
          <>
            <li onClick={() => onOptionClick('Applications 1A')}>Applications 1A</li>
            <li onClick={() => onOptionClick('Applications 1B')}>Applications 1B</li>
          </>
        );
      case 'Projects':
        return (
          <>
            <li onClick={() => onOptionClick(<Projects />)}>Projects 2A</li>
            <li onClick={() => onOptionClick('Projects 2B')}>Projects 2B</li>
          </>
        );
      case 'Issues':
        return (
          <>
            <li onClick={() => onOptionClick('Issues 3A')}>Issue Types</li>
            <li onClick={() => onOptionClick('Issues 3B')}>Issues 3B</li>
          </>
        );
      case 'Manage apps':
        return (
          <>
            <li onClick={() => onOptionClick('Manage apps 3A')}>Manage apps 3A</li>
            <li onClick={() => onOptionClick('Manage apps 3B')}>Manage apps 3B</li>
          </>
        );
      case 'User management':
        return (
          <>
            <li onClick={() => onOptionClick('User management 3A')}>User management 3A</li>
            <li onClick={() => onOptionClick('User management 3B')}>User management 3B</li>
          </>
        );
      case 'System':
        return (
          <>
            <li onClick={() => onOptionClick('System 3A')}>System 3A</li>
            <li onClick={() => onOptionClick('System 3B')}>System 3B</li>
          </>
        );
      case 'ScriptRunner':
        return (
          <>
            <li onClick={() => onOptionClick('ScriptRunner 3A')}>ScriptRunner 3A</li>
            <li onClick={() => onOptionClick('ScriptRunner 3B')}>ScriptRunner 3B</li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {renderSidebarOptions()}
      </ul>
    </div>
  );
};

export default Sidebar;
