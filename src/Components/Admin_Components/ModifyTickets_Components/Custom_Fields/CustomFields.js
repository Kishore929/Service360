import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetCustomFields_API, SearchCustomFields_API, ArchiveCustomField_API, GetCustomFieldsByPageNumber_API } from '../../../api_index';
import AddCustomField from './AddCustomField';
import { Notification } from '../../../com_index';
import './CustomField.scss'; // Ensure the CSS file is imported
import UpdateCustomField from './UpdateCustomField';
import ContextField from './ContextField';
import '@fortawesome/fontawesome-free/css/all.min.css';


const CustomFields = () => {

    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [notification, setNotification] = useState('');
    const [showAddFieldModal, setShowAddFieldModal] = useState(false); // State to control modal
    const [showUpdateField, setShowUpdateField] = useState(false);
    const [selectedField, setSelectedField] = useState([]);
    const [showContextField, setShowContextField] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: '100%', bottom: 'auto' });
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Add state for totalPages
    const navigate = useNavigate();
    const location = useLocation();

    // Ref for dropdown
    const dropdownRef = useRef(null);

    const parseQueryParams = () => {
        const searchParams = new URLSearchParams(location.search);
        const pageSize = parseInt(searchParams.get('pageSize')) || 50;
        const page = parseInt(searchParams.get('page')) || 1;
        return { pageSize, page };
    };

    const { pageSize, page } = parseQueryParams();

    const generatePagination = () => {
        const pages = [];
        const maxVisible = 3; // Number of main visible pages (centered around the current page)
        const firstPage = 1;
        const lastPage = totalPages;

        // Calculate the range of pages to display around the current page
        let startPage = Math.max(currentPage - 1, firstPage + 1);
        let endPage = Math.min(currentPage + 1, lastPage - 1);

        // Add the first page
        pages.push(firstPage);

        // Add ellipsis if there's a gap between the first page and the startPage
        if (startPage > firstPage + 1) {
            pages.push("...");
        }

        // Add the range of pages around the current page
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis if there's a gap between the endPage and the last page
        if (endPage < lastPage - 1) {
            pages.push("...");
        }

        // Add the last page
        pages.push(lastPage);

        return pages;
    };

    const pages = generatePagination();



    const toggleDropdown = (id) => {
        setOpenDropdownId(prevId => (prevId === id ? null : id));

        // Use setTimeout to wait for dropdown to render
        setTimeout(() => {
            if (dropdownRef.current) {
                const dropdownRect = dropdownRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - dropdownRect.bottom;
                const dropdownHeight = dropdownRect.height;

                // Check if there's enough space below, otherwise place above
                if (spaceBelow < dropdownHeight) {
                    // Not enough space below, position above
                    setDropdownPosition({ top: 'auto', bottom: '100%' });
                } else {
                    // Enough space below, position normally
                    setDropdownPosition({ top: '100%', bottom: 'auto' });
                }
            }
        }, 0);
    };

    const handlePageSizeChange = (newPageSize) => {
        navigate(`?page=1&pageSize=${newPageSize}`); // Reset to page 1 on size change
    };


    // const loadCustomFields = async () => {
    //     setLoading(true);
    //     try {
    //         const data = await GetCustomFields_API();
    //         setFields(data.result || []);
    //     } catch (error) {
    //         console.error('Error fetching custom fields:', error);
    //         showNotification('Error fetching custom fields. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadCustomFields();
    // }, []);



    const fetchPageData = async () => {

        const { pageSize, page } = parseQueryParams();

        const getpagenumfields = {
            pageNumber: page,
            pageSize,
        }

        try {
            const response = await GetCustomFieldsByPageNumber_API(getpagenumfields);
            setFields(response.result.item1 || []);
            const totalRecords = response.result.item2 || 0;
            setTotalPages(Math.ceil(totalRecords / pageSize));
            // showNotification(response.message);
            console.log(totalPages, response.result.item2);
        } catch (error) {
            console.error("Failed to fetch fields", error);
        }
    };

    // Fetch data whenever the current page changes
    useEffect(() => {
        fetchPageData();
    }, [currentPage]);

    useEffect(() => {
        fetchPageData();
    }, [location.search]);

    // Handlers for pagination
    // const goToPage = (page) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };

    // const goToPage = (newPage) => {
    //     if (newPage >= 1 && newPage <= totalPages) {
    //         setSearchParams({ pageSize, page: newPage }); // Update URL
    //     }
    // };

    const goToPage = (newPage) => {
        const { pageSize } = parseQueryParams();
        setCurrentPage(newPage);
        if (newPage >= 1 && newPage <= totalPages) {
            navigate(`?page=${newPage}&pageSize=${pageSize}`); // Update URL
        }
    };

    const openAddFieldModal = () => {
        setShowAddFieldModal(true); // Open modal
    };

    const handleClose = () => {
        setShowAddFieldModal(false); // Close modal
        setShowUpdateField(false);
    };

    const UpdateSuccess = () => {
        fetchPageData()
        // loadCustomFields();
        handleClose();
    };

    const handleAddSuccess = () => {
        fetchPageData()
        // loadCustomFields();
        handleClose();
    };

    const handleUpdateClick = (field) => {
        setSelectedField(field);
        setShowUpdateField(true);
        setOpenDropdownId(null);
    };

    const handleContextClick = (field) => {
        setSelectedField(field);
        setShowContextField(true);
        setOpenDropdownId(null);
    };

    const handleArchiveClick = async (field) => {
        const archiveField = {
            customFieldId: field.customFieldId,
            isArchive: true,
        }
        setLoading(true);
        try {
            const response = await ArchiveCustomField_API(archiveField);
            console.log(archiveField);
            setFields(response.result || []);
            showNotification(response.message);
        } catch (error) {
            console.error('Error fetching after archive customfield update:', error);
            showNotification('Error fetching after archive customfield update. Please try again.');
        } finally {
            setLoading(false);
            showNotification('');
        }
    };

    const refreshSelectedField = async () => {
        const updatedFields = await GetCustomFields_API(); // Or a more specific API call
        const updatedField = updatedFields.result.find(f => f.customFieldId === selectedField.customFieldId);
        setSelectedField(updatedField || null);
    };

    const handleSearchField = async (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        // If search query is empty, fetch all fields immediately
        if (value.trim() === "") {
            try {
                setLoading(true);
                const allFieldsResponse = await GetCustomFields_API();
                setFields(allFieldsResponse.result || []);
            } catch (error) {
                console.error('Error fetching all custom fields:', error);
                showNotification('Error fetching custom fields. Please try again.');
            } finally {
                setLoading(false);
            }
            return;
        }

        // Debounce the API call for searching
        debounce(async () => {
            try {
                setLoading(true);
                const searchResponse = await SearchCustomFields_API(value.trim());
                setFields(searchResponse.result || []);
                showNotification(searchResponse.message);
            } catch (error) {
                console.error('Error searching custom fields:', error);
                showNotification('Error searching custom fields. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce delay
    };

    // Debounce utility function
    let debounceTimer; // Persistent reference for the timer
    const debounce = (func, delay) => {
        clearTimeout(debounceTimer); // Clear any existing timer
        debounceTimer = setTimeout(func, delay); // Set a new timer
    };


    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    // useEffect to handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null); // Close dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="container">
            {notification && <Notification message={notification} />}

            {showContextField ? (
                <ContextField field={selectedField} refreshField={refreshSelectedField} />
            ) : showAddFieldModal ? (
                <AddCustomField
                    onCancel={handleClose}
                    onSuccess={handleAddSuccess}
                    displayMessage={showNotification}
                />
            ) : showUpdateField ? (
                <UpdateCustomField
                    customField={selectedField}
                    onCancel={handleClose}
                    onSuccess={UpdateSuccess}
                    displayMessage={showNotification}
                />
            ) : (
                <>
                    <div className="header-row-customfield" >
                        <h4>Custom Fields</h4>

                        <div style={{ position: 'relative', marginLeft: '250px', width: '40%' }}>
                            {/* Search Icon */}
                            <i
                                className="fa fa-search"
                                style={{
                                    position: 'absolute',
                                    left: '10px', // Adjust the icon's position inside the input
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#aaa', // Optional: Icon color
                                }}
                            ></i>

                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search custom fields"
                                value={searchQuery}
                                onChange={handleSearchField}
                                style={{
                                    padding: '10px 10px 10px 35px', // Adjust left padding for icon spacing
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    width: '50%',
                                    height: '35px',
                                    boxSizing: 'border-box', // Ensure padding and width work together
                                }}
                            />
                        </div>


                        <button className="add-CustomField-btn" onClick={openAddFieldModal}>Add Custom Field</button>
                    </div>

                    {loading && <div className="loading-indicator">Loading...</div>}

                    <table className="custom-field-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Type Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.length > 0 ? (
                                fields.map((field) => (
                                    <tr key={field.customFieldId}>
                                        <td>{field.name}</td>
                                        <td>{field.description}</td>
                                        <td>
                                            {field.customFieldType && (
                                                <div key={field.customFieldType.id}>{field.customFieldType.typeName}</div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="dropdown" ref={dropdownRef}>
                                                <div
                                                    align="left"
                                                    className="td-3dots"
                                                    onClick={() => toggleDropdown(field.customFieldId)}
                                                >
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </div>
                                                {openDropdownId === field.customFieldId && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="dropdown-menu-fields edge-right"
                                                        style={{ ...dropdownPosition }}
                                                    >
                                                        <div className="dropdown-item-fields">Associate</div>
                                                        <div
                                                            className="dropdown-item-fields"
                                                            onClick={() => handleContextClick(field)}
                                                        >
                                                            Contexts and default value
                                                        </div>
                                                        <div className="dropdown-item-fields"
                                                            onClick={() => handleArchiveClick(field)}
                                                        >
                                                            Archive</div>
                                                        <div
                                                            className="dropdown-item-fields"
                                                            onClick={() => handleUpdateClick(field)}
                                                        >
                                                            Update
                                                        </div>
                                                        <div className="dropdown-item-fields">Delete</div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))


                            ) : (
                                <tr>
                                    <td colSpan="4">No Fields types available</td>
                                </tr>
                            )}
                        </tbody>

                        {/* Pagination Controls */}
                        <div className="pagination-controls" style={{ marginTop: "15px", textAlign: "center" }}>
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                                }}
                            >
                                &lt; Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    style={{
                                        margin: "0 5px",
                                        padding: "5px 10px",
                                        backgroundColor: currentPage === index + 1 ? "#007BFF" : "white",
                                        color: currentPage === index + 1 ? "white" : "#000",
                                        border: "1px solid #ccc",
                                        cursor: "pointer",
                                    }}
                                >
                                    {index + 1}
                                </button>
                            )
                            )}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                style={{
                                    margin: "0 5px",
                                    padding: "5px 10px",
                                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                                }}
                            >
                                Next &gt;
                            </button>


                            {/* <label htmlFor="pageSize">Records per page:</label> */}
                            <select
                                id="pageSize"
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(e.target.value)}
                                style={{ marginLeft: '10px', padding: '5px' }}
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>


                        </div>
                    </table>
                </>
            )}
        </div>
    );
};

export default CustomFields;
