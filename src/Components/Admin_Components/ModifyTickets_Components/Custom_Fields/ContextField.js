import React, { useEffect, useState } from 'react';
import './CustomField.scss';
import AddConfigContext from './AddConfigContext';
import UpdateConfigContext from './UpdateConfigContext';
import UpdateDefaultContextValue from './UpdateDefaultContextValue';
import CustomField from './CustomFields';
import { Notification } from '../../../com_index';
import EditOptions from './EditOptions';

const ContextField = ({ field, refreshField }) => {

    const [selectedField, setSelectedField] = useState([]);
    const [selectedContext, setSelectedContext] = useState([]);
    const [showEditContext, setShowEditContext] = useState(false);
    const [displayContexts, setDisplayContexts] = useState([]);
    const [showCustomFields, setShowCustomFields] = useState(false);
    const [showAddContext, setShowAddContext] = useState(false);
    const [showEditDefaultContext, setShowEditDefaultContext] = useState(false);
    const [defaultContext, setDefaultContext] = useState([]); // State for matching context
    const [notification, setNotification] = useState('');
    const [showEditOptions, setShowEditOptions] = useState(false);


    const handleEditContext = (context) => {
        setSelectedContext(context);
        setShowEditContext(true); // Show the edit component when "Edit" is clicked
    };

    const handleEditOptions = (context) => {
        setSelectedContext(context);
        setShowEditOptions(true);
        setShowAddContext(false);
        setShowEditContext(false);
        setShowEditDefaultContext(false);
        setShowCustomFields(false);
    }

    const handleEditDefaultContext = (context) => {
        setSelectedContext(context);
        setShowEditDefaultContext(true);
    }

    const closeingEditorpage = () => {
        console.log('saved');
        refreshField();
        setShowAddContext(false);
        setShowEditContext(false);
        setShowEditDefaultContext(false);
        setShowCustomFields(false);
        setShowEditOptions(false);
    }

    const showNotification = (message) => {
        setNotification(message);

        const timer = setTimeout(() => {
            setNotification('');
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount

    };

    const viewCustomFields = () => {
        console.log('clicked')
        setShowCustomFields(true);
        setShowAddContext(false);
        setShowEditContext(false);
        setShowEditDefaultContext(false);
        setShowEditOptions(false);
    }
    const handleAddNewContext = (field) => {
        setShowAddContext(true);
        // setSelectedField(field); // Update the component to render
    };

    useEffect(() => {
        const fetchDefaultContext = async () => {
            if (!field || !field.contexts) return;
            const defaultvalue = field.contexts?.find(item => item.id === field.customFieldId);
            setDefaultContext(defaultvalue);
            setDisplayContexts(field.contexts.filter(context => context.id !== field.customFieldId));
            setSelectedField(field);
            console.log(field)
        };
        fetchDefaultContext();
    }, [field]);


    return (
        <div className="custom-fields-container">

            {notification && (<Notification message={notification} />)}

            {showCustomFields ? (
                <CustomField />
            ) : showAddContext ? (
                <AddConfigContext field={selectedField} closePage={closeingEditorpage} displayMessage={showNotification} />
            ) : showEditContext ? (
                <UpdateConfigContext context={selectedContext} closePage={closeingEditorpage} displayMessage={showNotification} />
            ) : showEditDefaultContext ? (
                <UpdateDefaultContextValue context={selectedContext} closePage={closeingEditorpage} displayMessage={showNotification} />
            ) : showEditOptions ? (
                <EditOptions context={selectedContext} closePage={closeingEditorpage} displayMessage={showNotification} />
            ) : (
                <>
                    {field ? (
                        <>
                            <div className="header-row-context-field">
                                <h4>Configure Custom Field: {field.name}</h4>
                            </div>

                            <p style={{ marginBottom: '8px' }}><strong>Description:</strong> {field.description}</p>
                            <p style={{ marginBottom: '8px' }}><strong>Field ID:</strong> {field.customFieldId}</p>
                            <p style={{ marginBottom: '8px' }}>Below are the Custom Field Configuration schemes for this custom field. Schemes are applicable for various issue types in a particular context. You can configure a custom field differently for each project context or in a global context. Moreover, project level schemes will override global ones.</p>
                            <p style={{ marginBottom: '8px' }}><strong>Is Options Needed:</strong> {field.customFieldType.isOptionsNeeded ? 'Yes' : 'No'}</p>

                            <ul style={{ padding: 0, marginLeft: 20 }} >
                                <li style={{ margin: '5px 0' }}>
                                    <span
                                        onClick={() => handleAddNewContext(field)}
                                        style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        Add new context
                                    </span>
                                </li>
                                <li style={{ margin: '5px 0' }}>
                                    <span
                                        onClick={() => viewCustomFields()}
                                        style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        View Custom Fields
                                    </span>
                                </li>
                            </ul>

                            {field.customFieldType.isOptionsNeeded && (
                                <div style={{ marginBottom: '8px' }}>
                                    <strong>Options:</strong>
                                    <ul className="no-bullets">
                                        {field.options?.map((option, index) => (
                                            <li key={index}>{option}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <hr />

                            {/* Default Context */}
                            {defaultContext && (
                                <div style={{ marginTop: '-18px' }}>
                                    <div className="header-row-context-field" style={{ marginBottom: '0px' }}>
                                        <strong>{defaultContext.name}</strong>
                                        <div className="button-group" >
                                            <button className="add-CustomField-btn" onClick={() => handleEditContext(defaultContext)}>Edit context</button>
                                            <button className="add-CustomField-btn">Delete context</button>
                                        </div>
                                    </div>

                                    <p style={{ marginBottom: '8px' }}>{defaultContext.description}</p>

                                    <p style={{ marginBottom: '8px' }}>Applicable contexts for scheme:
                                        <span
                                            onClick={() => handleEditContext(defaultContext)}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                        >
                                            Edit Configuration
                                        </span>
                                    </p>

                                    <p style={{ marginBottom: '8px' }}><strong>Ticket types:</strong> {defaultContext.ticketTypes?.map((item, index) => (
                                        <span key={index}>{item.name}{index < defaultContext.ticketTypes.length - 1 ? ', ' : ''}</span>
                                    ))}</p>

                                    <p style={{ marginBottom: '8px' }}><strong>Projects:</strong> {defaultContext.projects && defaultContext.projects.length > 0 ? defaultContext.projects?.map((item, index) => (
                                        <span key={index}>{item.name}{index < defaultContext.projects.length - 1 ? ', ' : ''}</span>
                                    )) : 'No projects assigned'}</p>

                                    <p style={{ marginBottom: '8px' }}><strong>Default Value:</strong>
                                        <span
                                            onClick={() => handleEditDefaultContext(defaultContext)}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                        >
                                            Edit Default Value
                                        </span>
                                        <ul>
                                            {defaultContext && (
                                                <li>
                                                    {defaultContext.contextValue?.find(item => item.isDefault === true)?.parentValue || 'No default value set'}
                                                </li>
                                            )}
                                        </ul>
                                    </p>

                                    {/* Options List */}
                                    {field.customFieldType.isOptionsNeeded && (
                                        <p style={{ marginBottom: '8px' }}><strong>Options:</strong>
                                            <span
                                                onClick={() => handleEditOptions(defaultContext)}  // Add your edit options handler here
                                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                            >
                                                Edit Options
                                            </span>
                                            <ul>
                                                {defaultContext.contextValue?.map((option, index) => (
                                                    <li key={index}>{option.isActive ? option.parentValue : `${option.parentValue} (disabled)`}</li>
                                                ))}
                                            </ul>

                                        </p>
                                    )}

                                    <hr />
                                </div>
                            )}

                            {/* Display other contexts */}
                            {displayContexts.length > 0 && displayContexts?.map((context, contextIndex) => (
                                <div key={contextIndex} className="context-container" style={{ marginTop: '-25px' }}>
                                    <div className="header-row-context-field" id={context.id} style={{ marginBottom: '8px' }}>
                                        <strong>{context.name}</strong>
                                        <div className="button-group">
                                            <button className="add-CustomField-btn" onClick={() => handleEditContext(context)}>Edit context</button>
                                            <button className="add-CustomField-btn" >Delete context</button>
                                        </div>
                                    </div>

                                    <p style={{ marginBottom: '8px' }}>{context.description}</p>

                                    <p style={{ marginBottom: '8px' }}>Applicable contexts for scheme:
                                        <span
                                            onClick={() => handleEditContext(context)}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                        >
                                            Edit Configuration
                                        </span>
                                    </p>

                                    <p style={{ marginBottom: '8px' }}><strong>Ticket types:</strong> {context.ticketTypes?.map((item, index) => (
                                        <span key={index}>
                                            {item.name}{index < context.ticketTypes.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}</p>

                                    <p style={{ marginBottom: '8px' }}><strong>Projects:</strong> {context.projects && context.projects.length > 0 ? context.projects?.map((item, index) => (
                                        <span key={index}>{item.name}{index < context.projects.length - 1 ? ', ' : ''}</span>
                                    )) : 'No projects assigned'}</p>

                                    <p style={{ marginBottom: '8px' }}><strong>Default Value:</strong>
                                        <span
                                            onClick={() => handleEditDefaultContext(context)}
                                            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                        >
                                            Edit Default Value
                                        </span>
                                        <ul>
                                            {context && (
                                                <li>
                                                    {context.contextValue?.find(item => item.isDefault === true)?.parentValue || 'No default value set'}
                                                </li>
                                            )}
                                        </ul>
                                    </p>

                                    {/* Options List */}
                                    {field.customFieldType.isOptionsNeeded && (
                                        <p style={{ marginBottom: '8px' }}><strong>Options:</strong>
                                            <span
                                                onClick={() => handleEditOptions(context)}  // Add your edit options handler here
                                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', marginLeft: '5px' }}
                                            >
                                                Edit Options
                                            </span>
                                            <ul>
                                                {context.contextValue?.map((option, index) => (
                                                    <li key={index}>{option.isActive ? option.parentValue : `${option.parentValue} (disabled)`}</li>
                                                ))}
                                            </ul>

                                        </p>
                                    )}

                                    <hr />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>No field selected.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ContextField;
