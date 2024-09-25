// src/Issues.js
import React, { Component } from 'react';
import './IssuesComponents.css'; 
import { fetchTicketTypes } from '../../Service';
import AddIssueType from './AddIssueType';

class IssueTypes extends Component {
  state = {
    ticketTypes: [],
    isOpen: false,
  };

  setIsOpen = (isOpen) => {
    this.setState({ isOpen });
};

  async componentDidMount() {
    const data = await fetchTicketTypes();
    this.setState({ ticketTypes: data.result }); // Set the result directly
  }

  handleEdit = (id) => {
    console.log(`Edit issue with ID: ${id}`);
    // Add your edit logic here
  };

  handleDelete = (id) => {
    console.log(`Delete issue with ID: ${id}`);
    // Add your delete logic here
  };

  render() {
    const { ticketTypes } = this.state;
    
    return (
      <div className="issues-container">
        <div>
                <div className='issues-header'>
                    <h5>Issue Types</h5>
                    <button onClick={() => this.setIsOpen(true)}>Add Issue Types</button>
                </div>
                {/* Pass the isOpen state and setIsOpen function to the Dashboard */}
                <AddIssueType isOpen={this.state.isOpen} setIsOpen={this.setIsOpen} />
          </div>
        <table className="table">
          <thead>
            <tr>
              <td scope="col">Name</td>
              <td scope="col">Actions</td>
            </tr>
          </thead>
          <tbody>
            {ticketTypes.length > 0 ? (
              ticketTypes.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <h6>{issue.name}</h6>
                    <div>{issue.description}</div> {/* Description below the name */}
                  </td>
                  <td>
                    <span 
                      className="action-link" 
                      onClick={() => this.handleEdit(issue.id)}
                    >
                      Edit
                    </span>
                    <span 
                      className="action-link" 
                      onClick={() => this.handleDelete(issue.id)} 
                      style={{ marginLeft: '10px' }} // Add spacing between links
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No issue types available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IssueTypes;
