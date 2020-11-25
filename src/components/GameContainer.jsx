import React, { useState, useLayoutEffect } from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from './MoleBoard';
import GameStat from './GameStat';

const INIT_TIME = 30;

const GameContainer = () => {

    const [clock, setClock] = useState(INIT_TIME)
    const [gameStats, setGameStats] = useState({score: 0});

    useLayoutEffect( () => {
        if(clock===INIT_TIME){
            let timer = { id: 0 };
            let innerClock = clock;
            timer.id = setInterval( () => {
                innerClock-=1;
                setClock(innerClock);
                !innerClock && clearInterval(timer.id);
            },1000);//EVERY SECOND
        }
    },[clock]);

    return (
        <div className="game-container">
            <div className="game-container__mole-board">
                <MoleBoard 
                    clock={clock} 
                    gameStats={gameStats} 
                    setGameStats={setGameStats} 
                />
            </div>
            <div className="game-container__game-stat">
                <GameStat clock={clock} gameStats={gameStats} />
            </div>
        </div>
    );
}

export default GameContainer;