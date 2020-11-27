import React from 'react';
import '../assets/style/components/GameStat.scss';

const GameStat = ({clock,gameInfo}) => {
    return (
        <div className="game-stat">
            <div className="game-stat__item">{clock}</div>
            <div className="game-stat__item">Score: {gameInfo.score}</div>
            <div className="game-stat__item">Need:  {gameInfo.scoreNeeded}</div>
            <div className="game-stat__item">Round: {gameInfo.round}</div>
        </div>
    );
}

export default GameStat;