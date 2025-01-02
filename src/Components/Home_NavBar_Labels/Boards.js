import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';

class Boards extends Component {
  render() {
    const projectOptions = [
      { id: 'project1', name: 'Project 1' },
      { id: 'project2', name: 'Project 2' },
      { id: 'project3', name: 'Project 3' },
    ];

    return (
      <div>
        <NavDropdown title="Boards" id="basic-nav-dropdown">
          {projectOptions.map(project => (
            <NavDropdown.Item key={project.id} href={`#${project.id}`}>
              {project.name} 
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div>
    );
  }
}

export default Boards;
