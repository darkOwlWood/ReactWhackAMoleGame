import React,{ useRef, useEffect } from 'react';
import '../assets/style/components/StartMessage.scss';
import Config from '../config';

const StartMessage = ({setClock,gameInfo,setGameInfo}) => {
    
    const divEl = useRef(null);
    const btnEl = useRef(null);

    useEffect(() => {
        btnEl.current.disabled = true;
        divEl.current.classList.add(Config.FADE_IN.className);
        setTimeout(() => {btnEl.current.disabled = false;},Config.FADE_IN.time);
    },[]);

    const handleClick = (event) => {
        btnEl.current.disabled = true;
        divEl.current.classList.add(Config.FADE_OUT.className);

        setTimeout(() => {
            setGameInfo({...gameInfo, gameStatus: Config.GAME_RUNING});
            setClock(Config.INIT_TIME);
        },Config.FADE_OUT.time);
    }

    return (
        <div ref={divEl} className="start-button">
            <button 
                ref={btnEl}
                className="start-button__item" 
                onClick={handleClick}
            >
                Start
            </button>
        </div>
    )
}

export default StartMessage;