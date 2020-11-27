import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/GameMessage.scss';

const GAME_MESSAGES = ['NEXT LEVEL!!','LOSER!','CONGRATULATIONS!!!'];
const MOVE_TO_RIGHT = {className: 'game-message__item--moveToRight', time: 2500};
const MOVE_TO_LEFT  = {className: 'game-message__item--moveToLeft',  time: 2500};

const GAME_BEGIN = 0;
const GAME_RUNING = 1;
const GAME_LOSS = 2;
const GAME_WIN = 3;

const GameMessage = ({gameInfo,setGameInfo}) => {

    const divMessage = useRef(null);
    const divItemRight = useRef(null);
    const divItemLeft  = useRef(null);
    const [message,setMessage] = useState(GAME_MESSAGES[0]);

    useEffect( () => {
        if(gameInfo.gameStatus===GAME_RUNING && gameInfo.round!==1){
            setMessage(GAME_MESSAGES[0]);
            showMessageAnimation();
        }else if(gameInfo.gameStatus===GAME_WIN){
            setMessage(GAME_MESSAGES[2]);
            showMessageAnimation(() => setGameInfo({...gameInfo, gameStatus: GAME_BEGIN}));
        }else if(gameInfo.gameStatus===GAME_LOSS){
            setMessage(GAME_MESSAGES[1]);
            showMessageAnimation(() => setGameInfo({...gameInfo, gameStatus: GAME_BEGIN}));
        }

    },[gameInfo.round,gameInfo.gameStatus]);
    
    function showMessageAnimation(callBack){
        divMessage.current.style.display = 'inline-block';
        divItemRight.current.classList.add(MOVE_TO_LEFT.className);
        divItemLeft.current.classList.add(MOVE_TO_RIGHT.className);
        setTimeout(() => {
            divMessage.current.style.display = 'none';
            divItemRight.current.classList.remove(MOVE_TO_LEFT.className);
            divItemLeft.current.classList.remove(MOVE_TO_RIGHT.className);
            callBack && callBack();
        },MOVE_TO_RIGHT.time);
    }

    return (
        <div ref={divMessage} className="game-message">
            <div ref={divItemRight} className="game-message__item game-message__item--right">
                { message }
            </div>
            <div ref={divItemLeft} className="game-message__item game-message__item--left">
                { message }
            </div>
        </div>
    );
}

export default GameMessage;