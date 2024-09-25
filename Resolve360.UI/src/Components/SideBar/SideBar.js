// src/SideBar.js
import React, { useState } from 'react';
import './SideBar.css';
import IssueTypes from '../IssueComponents/IssueType';

const Users = () => <div>Content will display here..</div>;
const Settings = () => <div>Content will display here..</div>;
const Projects = () => <div>Content will display here..</div>;

const SideBar = ({ activeComponent, setActiveComponent }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Issue Types':
        return <IssueTypes />;
      case 'Issue type Schemes':
        return <Users />;
      case 'SubTasks':
        return <Settings />;
      case 'Workflows':
        return <Projects />;
      default:
        return <IssueTypes />;
    }
  };

  return (
    <div className={`sidebar-container`}>
      <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="toggle-icon" onClick={toggleSidebar}>
          {isExpanded ? '<' : '>'}
        </div>
        {isExpanded && (
          <div className="sidebar-items">
            {['Issue Types', 'Issue type Schemes', 'SubTasks', 'Workflows'].map(item => (
              <div 
                key={item}
                className={`sidebar-item ${activeComponent === item ? 'active' : ''}`} 
                onClick={() => setActiveComponent(item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </aside>
      <main className="main-content">
        {renderComponent()}
      </main>
    </div>
  );
};

export default SideBar;
