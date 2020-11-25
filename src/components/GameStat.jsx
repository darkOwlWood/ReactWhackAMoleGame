import React from 'react';
import '../assets/style/components/GameStat.scss';

const GameStat = ({gameStats}) => {
    return (
        <div className="game-stat">
            {
                gameStats.score
            }
        </div>
    );
}

export default GameStat;