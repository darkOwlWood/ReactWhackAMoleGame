import React from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from '../components/MoleBoard';

const GameContainer = () => {
    return (
        <div className="game-container">
            <div className="game-container__mole-board">
                <MoleBoard />
            </div>
        </div>
    );
}

export default GameContainer;