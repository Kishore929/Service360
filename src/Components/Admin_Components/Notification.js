import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (message) {
            setNotification(message);
            const timer = setTimeout(() => {
                setNotification('');
            }, 3000);

            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [message]); // Run only when the message changes

    const notificationStyle = {
        position: 'fixed',
        top: '60px',
        right: '20px',
        backgroundColor: '#4caf50', // Green background for success
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        zIndex: 1000, // Ensure it's above other elements
        opacity: notification ? 1 : 0, // Optional: fade-out effect
        transition: 'opacity 0.5s ease',
    };

    return (
        <>
            {notification && (
                <div style={notificationStyle}>
                    {notification}
                </div>
            )}
        </>
    );
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Notification;
