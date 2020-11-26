import React, { useState, useLayoutEffect } from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from './MoleBoard';
import GameStat from './GameStat';
import StartMessage from './StartMessage';

const INIT_TIME = 30;
const FINAL_ROUND = 5;
const SCORE_NEEDED = 100;

const GameContainer = () => {

    const [clock, setClock] = useState(0);
    const [gameStart, setGameStart] = useState(0);
    const [gameStats, setGameStats] = useState({score: 0, round: 1, scoreNeeded: SCORE_NEEDED});

    // console.log('Current',gameStats.score);

    useLayoutEffect( () => {
        console.log(gameStart)
        if(clock===INIT_TIME && gameStart){
            let timer = { id: 0 };
            let innerClock = clock;
            timer.id = setInterval( () => {
                innerClock-=1;
                setClock(innerClock);
                !innerClock && clearInterval(timer.id);
            },1000);//EVERY SECOND
        }else if(!clock && gameStart){
            nextLevel();
        }
    },[clock]);

    function nextLevel(){
        if(gameStats.round<FINAL_ROUND && gameStats.score>=SCORE_NEEDED){
            console.log('Next Level');
            setGameStats({...gameStats, round: ++gameStats.round});
            setTimeout(() => setClock(INIT_TIME),4000);
        }else if(gameStats.round===FINAL_ROUND && gameStats.score>=SCORE_NEEDED){
            setGameStart(0);
            console.log('Congratulations you beat the game !!!');
        }else{
            setGameStart(0);
            // setGameStats({...gameStats, score: 0, round: 1});
            console.log('Looser!!!');
        }
    }

    return (
        <div className="game-container">
            <div className="game-container__mole-board">
                <MoleBoard 
                    clock={clock} 
                    gameStats={gameStats} 
                    setGameStats={setGameStats} 
                />
                { !gameStart && <StartMessage setClock={setClock} setGameStart={setGameStart} /> }
            </div>
            <div className="game-container__game-stat">
                <GameStat clock={clock} gameStats={gameStats}/>
            </div>
        </div>
    );
}

export default GameContainer;