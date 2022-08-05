import React, { Component } from 'react';
import Header from '../Components/Header';

class Game extends Component {
  render() {
    return (
      <div data-testid="settings-title">
        <h1>Game</h1>
        <Header/>
      </div>
    );
  }
}

export default Game;
