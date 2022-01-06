import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';
// the array of words is used as data provider
const words = ['application', 'programming', 'interface', 'wizard'];
// the selected word is used as picking the random word
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  // the state
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        // letter to lowercase
        const letter = key.toLowerCase();
        // checking is letter present in selectedword
        if (selectedWord.includes(letter)) {
          
          if (!correctLetters.includes(letter)) {
            // new letter is going to add
            setCorrectLetters(prevLetters => [...prevLetters, letter])
             
          } else {
            // a notification is going to show 
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(prevLetters => [...prevLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} 
              correctLetters={correctLetters} 
        />                  
      </div>
      <Popup correctLetters={correctLetters} 
              wrongLetters={wrongLetters} 
              selectedWord={selectedWord} 
              setPlayable={setPlayable} 
              playAgain={playAgain} 
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;