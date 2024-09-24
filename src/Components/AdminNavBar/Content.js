// src/components/Content.js
import React from 'react';
import './AdminNavBar.css';

const Content = ({ activeContent }) => {
  return (
    <div className="content">
      {activeContent || 'Please select an option from the sidebar.'}
    </div>
  );
};

export default Content;
