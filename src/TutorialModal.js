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
          <li>In Edit Mode, use the input field to add a new deck.</li>
          <li>Click the "Add Deck" button to save it.</li>
          <li>Switch to Main Mode to select and save your parked deck.</li>
        </ol>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};

export default TutorialModal;
