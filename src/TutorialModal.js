import React from "react";
import "./TutorialModal.css";

const TutorialModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome to ParkPal</h2>
        <p>
          It looks like you don't have any decks added yet. Here's how you can
          get started:
        </p>
        <ol>
          <li>Switch to Edit Mode using the ⚙️ button.</li>
          <li>Use the input field to add a new deck.</li>
          <li>Click the "Add Deck" button to save it.</li>
          <li>Click "Confirm" to save your changes.</li>
        </ol>
        <button onClick={onClose} className="close-button">
          Got it!
        </button>
      </div>
    </div>
  );
};

export default TutorialModal;
