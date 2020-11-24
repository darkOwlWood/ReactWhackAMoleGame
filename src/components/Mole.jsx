import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/Mole.scss';

const IN_STATE  = 0;
const OUT_STATE = 1;
const HIT_STATE = 2;

const NO_MOLE   = {id:-1, points: 0};
const RED_MOLE  = {id:0,  points: 100};
const BLUE_MOLE = {id:1,  points: 150};
const GOLD_MOLE = {id:2,  points: 300};

const GLOBAL_WAIT_TIME = 4000;
const MOLE_OUT_TIME = 2000;
const MOLE_WAIT_TIME = 1000;
const MAX_MOLE = 8;

const Mole = ({id,activeMole,molePoints}) => {

    const timerId = useRef(null);
    const [moleState, setMoleState] = useState({position: IN_STATE, type:NO_MOLE.id});

    useEffect(() => {
        setTimeout(() => {
            if(moleState.position===IN_STATE && activeMole.current < MAX_MOLE){
                if(Math.floor(Math.random()*2)){//THE GOES OUT OR NOT
                    activeMole.current = activeMole.current + 1;
                    setMoleState({position: OUT_STATE, type: Math.floor(Math.random()*3)});
                    setTimeout(() => {
                        activeMole.current = activeMole.current - 1;
                        setMoleState({...moleState,position:IN_STATE});
                    },MOLE_OUT_TIME);
                }else{
                    setTimeout(() => setMoleState({...moleState}),0);
                }
            }else if(moleState===IN_STATE){
                setTimeout(() => setMoleState({...moleState}),0);
            }
        },MOLE_WAIT_TIME);
    },[moleState]);

    const checkMoleType = () => {

    }

    const handleClick = () =>{
        // clearTimeout(timerId);
        // molePoints(moleState.type);
        // setMoleState({...moleState, position: HIT_STATE});
    }

    return (
        <div 
            className={`mole ${
                    moleState.type===RED_MOLE.id? 
                        'mole--active-red'
                        :moleState.type===BLUE_MOLE.id?
                        'mole--active-blue'
                        :'' 
                }`} 
            onClick={moleState.position===OUT_STATE? handleClick : ()=>{}}
        >

        </div>
    );
}

export default React.memo(Mole);