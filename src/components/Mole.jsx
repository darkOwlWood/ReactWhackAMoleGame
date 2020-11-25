import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/Mole.scss';

const IN_STATE  = 0;
const OUT_STATE = 1;
const HIT_STATE = 2;

const NO_MOLE   = {id:-1, points: 0  , className: 'mole--active-zero'};
const RED_MOLE  = {id:0,  points: 100, className: 'mole--active-red' };
const BLUE_MOLE = {id:1,  points: 150, className: 'mole--active-blue'};
const GOLD_MOLE = {id:2,  points: 300, className: 'mole--active-gold'};

const GLOBAL_WAIT_TIME = 4000;
const MOLE_OUT_TIME = 2000;
const MOLE_WAIT_TIME = [1300,1000,700];
const MAX_MOLE = 8;

const Mole = ({lockMole,activeMole,molePoints}) => {

    const divEl = useRef(null);
    const timerId = useRef(null);
    const timerId2 = useRef(null);
    const [moleState, setMoleState] = useState({position: IN_STATE, type:NO_MOLE.id});

    useEffect(() => {
        if(lockMole){
            console.log('Block');
            clearTimeout(timerId.current);
            clearTimeout(timerId2.current);
            activeMole.current = 0;
            setMoleState({position: IN_STATE, type:NO_MOLE.id});
        }
    },[lockMole]);

    useEffect(() => {
        if(!lockMole){
            timerId2.current = setTimeout(() => {
                if(moleState.position===IN_STATE && activeMole.current<MAX_MOLE){
                    if(Math.floor(Math.random()*2)){//THE GOES OUT OR NOT
                        activeMole.current = activeMole.current + 1;
                        setMoleState({position: OUT_STATE, type: getMoleType()});
                        timerId.current = setTimeout(() => {
                            activeMole.current = activeMole.current - 1;
                            setMoleState({...moleState,position:IN_STATE});
                        },MOLE_OUT_TIME);
                    }else{
                        setMoleState({...moleState});
                    }
                }else if(moleState===IN_STATE){
                    setMoleState({...moleState});
                }
            },MOLE_WAIT_TIME[Math.floor(Math.random()*3)]);
        }
    },[moleState,lockMole]);


    function getMoleType(){
        let moleType = 0;
        const randomNumber = Math.floor(Math.random()*100)+1;

        moleType = (randomNumber>=1 && randomNumber<=50)?
                    RED_MOLE.id
                    :(randomNumber>=51 && randomNumber<=90)?
                    BLUE_MOLE.id
                    :(randomNumber>=91 && randomNumber<=100)?
                    GOLD_MOLE.id : NO_MOLE.id;

        return moleType;
    }

    const getMoleCssClass = (moleType) => {
        let cssClassName = '';
        switch(moleType){
            case RED_MOLE.id:  cssClassName=RED_MOLE.className;  break;
            case BLUE_MOLE.id: cssClassName=BLUE_MOLE.className; break; 
            case GOLD_MOLE.id: cssClassName=GOLD_MOLE.className; break; 
            default: cssClassName=NO_MOLE.className;
        }

        return cssClassName;
    }

    const handleClick = () =>{
        if(!lockMole){
            clearTimeout(timerId.current);
            molePoints(moleState.type);
            activeMole.current = activeMole.current - 1;
            setMoleState({position: IN_STATE, type:NO_MOLE.id});
        }
    }

    return (
        <div 
            className={`mole ${getMoleCssClass(moleState.type)}`} 
            onClick={(moleState.position===OUT_STATE)? handleClick : ()=>{}}
        >

        </div>
    );
}

export default Mole;