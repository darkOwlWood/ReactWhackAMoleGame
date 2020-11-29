import React, { useState, useLayoutEffect } from 'react';
import '../assets/style/components/GameContainer.scss';
import MoleBoard from './MoleBoard';
import GameStat from './GameStat';
import StartMessage from './StartMessage';
import GameMessage from './GameMessage';
import Config from '../config';

const GameContainer = () => {

    const [clock, setClock] = useState(0);
    const [gameInfo, setGameInfo] = useState({score: 0, round: 1, scoreNeeded: Config.SCORE_NEEDED[0], gameStatus: Config.GAME_BEGIN});

    useLayoutEffect( () => {
        console.log(gameInfo.gameStatus)
        if(clock===Config.INIT_TIME && gameInfo.gameStatus===Config.GAME_RUNING){
            let timer = { id: 0 };
            let innerClock = clock;
            timer.id = setInterval( () => {
                innerClock-=1;
                setClock(innerClock);
                !innerClock && clearInterval(timer.id);
            },1000);//EVERY SECOND
        }else if(!clock && gameInfo.gameStatus===Config.GAME_RUNING){
            nextLevel();
        }
    },[clock]);

    function nextLevel(){
        if(gameInfo.round<Config.FINAL_ROUND && gameInfo.score>=gameInfo.scoreNeeded){
            setGameInfo({...gameInfo, round: gameInfo.round + 1, scoreNeeded: Config.SCORE_NEEDED[gameInfo.round]});
            setTimeout(() => setClock(Config.INIT_TIME),Config.LVEL_TRANSITION_TIME);
        }else if(gameInfo.round===Config.FINAL_ROUND && gameInfo.score>=gameInfo.scoreNeeded){
            setGameInfo({...gameInfo, score:0, round:1, scoreNeeded: Config.SCORE_NEEDED[0], gameStatus: Config.GAME_WIN});
        }else{
            setGameInfo({...gameInfo, score:0, round:1, scoreNeeded: Config.SCORE_NEEDED[0], gameStatus: Config.GAME_LOSS});
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
                    (gameInfo.gameStatus===Config.GAME_BEGIN) && 
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