import React from 'react';

const EditScreen = ({ screen, onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Back to Screens</button>
      <h5>Edit Screen: {screen.name}</h5>
      <p>Description: {screen.description}</p>
    </div>
  );
};

export default EditScreen;
