import React, { useState, useLayoutEffect } from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from './MoleBoard';
import GameStat from './GameStat';
import StartMessage from './StartMessage';
import GameMessage from './GameMessage';

const INIT_TIME = 30;
const FINAL_ROUND = 5;
const SCORE_NEEDED = 6000;

const GAME_BEGIN = 0;
const GAME_RUNING = 1;
const GAME_LOSS = 2;
const GAME_WIN = 3;

const GameContainer = () => {

    const [clock, setClock] = useState(0);
    const [gameInfo, setGameInfo] = useState({score: 0, round: 1, scoreNeeded: SCORE_NEEDED, gameStatus: GAME_BEGIN});

    useLayoutEffect( () => {
        console.log(gameInfo.gameStatus)
        if(clock===INIT_TIME && gameInfo.gameStatus===GAME_RUNING){
            let timer = { id: 0 };
            let innerClock = clock;
            timer.id = setInterval( () => {
                innerClock-=1;
                setClock(innerClock);
                !innerClock && clearInterval(timer.id);
            },1000);//EVERY SECOND
        }else if(!clock && gameInfo.gameStatus===GAME_RUNING){
            nextLevel();
        }
    },[clock]);

    function nextLevel(){
        if(gameInfo.round<FINAL_ROUND && gameInfo.score>=SCORE_NEEDED){
            console.log('Next Level');
            setGameInfo({...gameInfo, round: ++gameInfo.round});
            setTimeout(() => setClock(INIT_TIME),4000);
        }else if(gameInfo.round===FINAL_ROUND && gameInfo.score>=SCORE_NEEDED){
            setGameInfo({...gameInfo, score:0, round:1, gameStatus: GAME_WIN});
            console.log('Congratulations you beat the game !!!');
        }else{
            setGameInfo({...gameInfo, score:0, round:1, gameStatus: GAME_LOSS});
            console.log('Looser!!!');
        }
    }

    return (
        <div className="game-container">
            <div className="game-container__mole-board">
                <MoleBoard 
                    clock={clock} 
                    gameInfo={gameInfo} 
                    setGameInfo={setGameInfo} 
                />
                <GameMessage gameInfo={gameInfo} setGameInfo={setGameInfo} />
                { 
                    gameInfo.gameStatus===GAME_BEGIN && 
                    <StartMessage 
                        setClock={setClock} 
                        gameInfo={gameInfo}
                        setGameInfo={setGameInfo}
                    /> 
                }
            </div>
            <div className="game-container__game-stat">
                <GameStat clock={clock} gameInfo={gameInfo}/>
            </div>
        </div>
    );
}

export default GameContainer;