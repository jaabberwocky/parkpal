import React, { useState, useEffect } from "react";
import "./App.css";
import TutorialModal from "./TutorialModal";
import logo from "./logo192.png";

function App() {
  const [decks, setDecks] = useState(() => {
    const savedDecks = localStorage.getItem("decks");
    return savedDecks ? JSON.parse(savedDecks) : [];
  });
  const [newDeck, setNewDeck] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editDeck, setEditDeck] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("");
  const [confirmedDeck, setConfirmedDeck] = useState(() => {
    const savedConfirmedDeck = localStorage.getItem("confirmedDeck");
    return savedConfirmedDeck ? savedConfirmedDeck : "";
  });
  const [lastParked, setLastParked] = useState(() => {
    const savedLastParked = localStorage.getItem("lastParked");
    return savedLastParked ? savedLastParked : "";
  });
  const [isEditMode, setIsEditMode] = useState(decks.length === 0);
  const [showTutorial, setShowTutorial] = useState(decks.length === 0);

  useEffect(() => {
    localStorage.setItem("decks", JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem("confirmedDeck", confirmedDeck);
  }, [confirmedDeck]);

  useEffect(() => {
    localStorage.setItem("lastParked", lastParked);
  }, [lastParked]);

  const addDeck = () => {
    if (newDeck.trim()) {
      setDecks([...decks, newDeck.trim()]);
      setNewDeck("");
    }
  };

  const editDeckLabel = (index) => {
    setEditIndex(index);
    setEditDeck(decks[index]);
  };

  const updateDeck = () => {
    if (editDeck.trim()) {
      const updatedDecks = decks.map((deck, index) =>
        index === editIndex ? editDeck.trim() : deck
      );
      setDecks(updatedDecks);
      setEditIndex(-1);
      setEditDeck("");
    }
  };

  const deleteDeck = (index) => {
    const updatedDecks = decks.filter((_, i) => i !== index);
    setDecks(updatedDecks);
  };

  const saveSelectedDeck = () => {
    if (selectedDeck) {
      setConfirmedDeck(selectedDeck);
      const timestamp = new Date().toLocaleString();
      setLastParked(timestamp);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const clearAllDecks = () => {
    setDecks([]);
    setConfirmedDeck("");
    setSelectedDeck("");
    setLastParked("");
  };

  return (
    <div className="App">
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      <img src={logo} alt="logo" width={150} />
      <h1>ParkPal</h1>
      {!isEditMode && (
        <button onClick={toggleEditMode} className="toggle-button">
          ⚙️ Switch to Edit Mode
        </button>
      )}
      {isEditMode ? (
        <div>
          <div>
            <input
              type="text"
              value={newDeck}
              onChange={(e) => setNewDeck(e.target.value)}
              placeholder="Add a new deck"
            />
            <button onClick={addDeck}>Add Deck</button>
          </div>
          {editIndex >= 0 && (
            <div>
              <input
                type="text"
                value={editDeck}
                onChange={(e) => setEditDeck(e.target.value)}
                placeholder="Edit deck label"
              />
              <button onClick={updateDeck}>Update Deck</button>
            </div>
          )}
          <ul>
            {decks.map((deck, index) => (
              <li key={index}>
                {deck}
                <button onClick={() => editDeckLabel(index)}>Edit</button>
                <button onClick={() => deleteDeck(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={clearAllDecks} className="clear-button">
            Clear all
          </button>
          <button onClick={toggleEditMode} className="confirm-button">
            Confirm
          </button>
        </div>
      ) : (
        <div>
          <div className="deck-buttons">
            {decks.map((deck, index) => (
              <button
                key={index}
                onClick={() => setSelectedDeck(deck)}
                className={deck === selectedDeck ? "selected" : ""}
              >
                {deck}
              </button>
            ))}
          </div>
          <button onClick={saveSelectedDeck} disabled={!selectedDeck}>
            Save
          </button>
          {confirmedDeck && (
            <div className="parked-info">
              <h2>Parked at: {confirmedDeck}</h2>
              <p>Last parked at: {lastParked}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
