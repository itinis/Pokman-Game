import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameBoard from './components/game-board/GameBoard';

function App() {
  return (
    <div className="App">
      <GameBoard/>
    </div>
  );
}

export default App;
