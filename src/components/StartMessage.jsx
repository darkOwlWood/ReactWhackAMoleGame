import React,{ useRef, useEffect } from 'react';
import '../assets/style/components/StartMessage.scss';

const INIT_TIME = 30;
const FADE_OUT = { className: 'start-button--fade-out', time: 2000 }
const FADE_IN = { className: 'start-button--fade-in', time: 1000 }

const StartMessage = ({setClock,setGameStart}) => {
    
    const divEl = useRef(null);
    const btnEl = useRef(null);

    useEffect(() => {
        btnEl.current.disabled = true;
        divEl.current.classList.add(FADE_IN.className);
        setTimeout(() => {btnEl.current.disabled = false;},FADE_IN.time);
    },[]);

    const handleClick = (event) => {
        btnEl.current.disabled = true;
        divEl.current.classList.add(FADE_OUT.className);

        setTimeout(() => {
            setGameStart(1);
            setClock(INIT_TIME);
        },FADE_OUT.time);
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