import React from 'react';
import '../assets/style/components/GameStat.scss';

const GameStat = ({clock,gameStats}) => {
    return (
        <div className="game-stat">
            <div className="game-stat__item">{clock}</div>
            <div className="game-stat__item">{gameStats.score}</div>
        </div>
    );
}

export default GameStat;