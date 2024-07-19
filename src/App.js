import React, { useState, useEffect } from "react";
import "./App.css";
import TutorialModal from "./TutorialModal";
import logo from "./logo192.png";

const getLocalStorageItem = (key, defaultValue) => {
  try {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error);
    return defaultValue;
  }
};

function App() {
  const [decks, setDecks] = useState(() => getLocalStorageItem("decks", []));
  const [newDeck, setNewDeck] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editDeck, setEditDeck] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("");
  const [confirmedDeck, setConfirmedDeck] = useState(() =>
    getLocalStorageItem("confirmedDeck", "")
  );
  const [lastParked, setLastParked] = useState(() =>
    getLocalStorageItem("lastParked", "")
  );
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
      setDecks((prevDecks) => [...prevDecks, newDeck.trim()]);
      setNewDeck("");
    }
  };

  const editDeckLabel = (index) => {
    setEditIndex(index);
    setEditDeck(decks[index]);
  };

  const updateDeck = () => {
    if (editDeck.trim()) {
      setDecks((prevDecks) =>
        prevDecks.map((deck, index) =>
          index === editIndex ? editDeck.trim() : deck
        )
      );
      setEditIndex(-1);
      setEditDeck("");
    }
  };

  const deleteDeck = (index) => {
    setDecks((prevDecks) => prevDecks.filter((_, i) => i !== index));
  };

  const saveSelectedDeck = () => {
    if (selectedDeck) {
      setConfirmedDeck(selectedDeck);
      setLastParked(new Date().toLocaleString());
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
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
        <EditMode
          decks={decks}
          newDeck={newDeck}
          setNewDeck={setNewDeck}
          addDeck={addDeck}
          editIndex={editIndex}
          editDeck={editDeck}
          setEditDeck={setEditDeck}
          updateDeck={updateDeck}
          editDeckLabel={editDeckLabel}
          deleteDeck={deleteDeck}
          clearAllDecks={clearAllDecks}
          toggleEditMode={toggleEditMode}
        />
      ) : (
        <ViewMode
          decks={decks}
          selectedDeck={selectedDeck}
          setSelectedDeck={setSelectedDeck}
          saveSelectedDeck={saveSelectedDeck}
          confirmedDeck={confirmedDeck}
          lastParked={lastParked}
        />
      )}
    </div>
  );
}

const EditMode = ({
  decks,
  newDeck,
  setNewDeck,
  addDeck,
  editIndex,
  editDeck,
  setEditDeck,
  updateDeck,
  editDeckLabel,
  deleteDeck,
  clearAllDecks,
  toggleEditMode,
}) => (
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
);

const ViewMode = ({
  decks,
  selectedDeck,
  setSelectedDeck,
  saveSelectedDeck,
  confirmedDeck,
  lastParked,
}) => (
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
);

export default App;
