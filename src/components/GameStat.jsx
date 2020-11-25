import React from 'react';
import '../assets/style/components/GameStat.scss';

const GameStat = ({clock,gameStats}) => {
    return (
        <div className="game-stat">
            <div className="game-stat__item">{clock}</div>
            <div className="game-stat__item">Score: {gameStats.score}</div>
            <div className="game-stat__item">Need:  {gameStats.scoreNeeded}</div>
            <div className="game-stat__item">Round: {gameStats.round}</div>
        </div>
    );
}

export default GameStat;