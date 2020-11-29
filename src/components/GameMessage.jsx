import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/GameMessage.scss';
import Config from '../config';

const GameMessage = ({gameInfo,setGameInfo}) => {

    const divMessage = useRef(null);
    const divItemRight = useRef(null);
    const divItemLeft  = useRef(null);
    const [message,setMessage] = useState(Config.GAME_MESSAGES[0]);

    useEffect( () => {
        if(gameInfo.gameStatus===Config.GAME_RUNING && gameInfo.round!==1){
            setMessage(Config.GAME_MESSAGES[0]);
            showMessageAnimation();
        }else if(gameInfo.gameStatus===Config.GAME_WIN){
            setMessage(Config.GAME_MESSAGES[2]);
            showMessageAnimation(() => setGameInfo({...gameInfo, gameStatus: Config.GAME_BEGIN}));
        }else if(gameInfo.gameStatus===Config.GAME_LOSS){
            setMessage(Config.GAME_MESSAGES[1]);
            showMessageAnimation(() => setGameInfo({...gameInfo, gameStatus: Config.GAME_BEGIN}));
        }

    },[gameInfo.round,gameInfo.gameStatus]);
    
    function showMessageAnimation(callBack){
        divMessage.current.style.display = 'inline-block';
        divItemRight.current.classList.add(Config.MOVE_TO_LEFT.className);
        divItemLeft.current.classList.add(Config.MOVE_TO_RIGHT.className);
        setTimeout(() => {
            divMessage.current.style.display = 'none';
            divItemRight.current.classList.remove(Config.MOVE_TO_LEFT.className);
            divItemLeft.current.classList.remove(Config.MOVE_TO_RIGHT.className);
            callBack && callBack();
        },Config.MOVE_TO_RIGHT.time);
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