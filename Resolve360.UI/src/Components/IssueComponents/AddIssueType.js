import React, { Component } from 'react';
import { addIssues } from '../../Service';
import './AddIssuesType.css'; // Make sure to import your styles

class AddIssueType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                name: '',
                description: '',
            },
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { formData } = this.state;

        try {
            const result = await addIssues(formData); // Send the data to the backend
            console.log('Issue type added successfully:', result);
            this.props.setIsOpen(false); // Close the pop-up after successful submission
            // Optionally reset the form data
            this.setState({
                formData: { name: '', description: '' },
            });
        } catch (error) {
            console.error('Error adding issue type:', error);
        }
    };

    render() {
        return (
            <div>
                {this.props.isOpen && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Add Issue Type</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={this.state.formData.name}
                                        onChange={this.handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Description:</label>
                                    <textarea
                                        name="description"
                                        value={this.state.formData.description}
                                        onChange={this.handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={() => this.props.setIsOpen(false)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default AddIssueType;
