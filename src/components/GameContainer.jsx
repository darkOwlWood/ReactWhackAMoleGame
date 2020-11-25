import React, { useState, useEffect } from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from './MoleBoard';
import GameStat from './GameStat';

const GameContainer = () => {

    const [gameStats, setGameStats] = useState({score: 0});

    return (
        <div className="game-container">
            <div className="game-container__mole-board">
                <MoleBoard setGameStats={setGameStats}/>
            </div>
            <div className="game-container__game-stat">
                <GameStat gameStats={gameStats} />
            </div>
        </div>
    );
}

export default GameContainer;