import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/Mole.scss';

const IN_STATE  = 0;
const OUT_STATE = 1;

const NO_MOLE   = {id:-1, points: 0  , className: 'mole__image--active-zero', classNameHit: 'mole__image--hit_zero'};
const RED_MOLE  = {id:0,  points: 100, className: 'mole__image--active-red' , classNameHit: 'mole__image--hit-red' };
const BLUE_MOLE = {id:1,  points: 150, className: 'mole__image--active-blue', classNameHit: 'mole__image--hit-blue'};
const GOLD_MOLE = {id:2,  points: 300, className: 'mole__image--active-gold', classNameHit: 'mole__image--hit-gold'};

const MOLE_TRANSITION = { className: 'mole__image--inactive', time: 400 };
const MOLE_WAIT_TIME = [1500,2000,700];
const MAX_MOLE = 8;

const Mole = ({lockMole,activeMole,molePoints}) => {

    const divMoleItem = useRef(null);
    const MainTimerId = useRef(null);
    const [moleState, setMoleState] = useState({position: IN_STATE, type:NO_MOLE.id});

    useEffect(() => {
        if(lockMole){
            console.log('Block');
            clearTimeout(MainTimerId.current);
            activeMole.current = 0;
            setMoleState({position: IN_STATE, type:NO_MOLE.id});
            goInAnimation();
        }
    },[lockMole]);

    useEffect(() => {
        if(!lockMole){
            MainTimerId.current = setTimeout(moleCicle,MOLE_WAIT_TIME[Math.floor(Math.random()*MOLE_WAIT_TIME.length)]);
        }
    },[moleState,lockMole]);
    
    function moleCicle(){
        if(moleState.position===IN_STATE && activeMole.current<MAX_MOLE){
            const type = getMoleType();
            if(type!==NO_MOLE.id){
                activeMole.current = ++activeMole.current 
                setMoleState({...moleState, position:OUT_STATE, type});
                goOutAnimation(type);
            }else{
                setMoleState({...moleState});
            }
        }else if(moleState.position===OUT_STATE){
            activeMole.current = --activeMole.current;
            setMoleState({...moleState, position: IN_STATE, type:NO_MOLE.id});
            goInAnimation();
        }else{
            setMoleState({...moleState});
        }
    }

    function goOutAnimation(type){
        divMoleItem.current.classList.remove(NO_MOLE.className,RED_MOLE.className,BLUE_MOLE.className,GOLD_MOLE.className);
        divMoleItem.current.classList.remove(NO_MOLE.classNameHit,RED_MOLE.classNameHit,BLUE_MOLE.classNameHit,GOLD_MOLE.classNameHit);
        divMoleItem.current.classList.remove(MOLE_TRANSITION.className);
        divMoleItem.current.classList.add(getMoleCssClass(type));
    }

    function goInAnimation(){
        divMoleItem.current.classList.add(MOLE_TRANSITION.className);
    }
    
    function getMoleType(){
        let moleType = NO_MOLE.id;

        if(Math.floor(Math.random()*2)){
            const randomNumber = Math.floor(Math.random()*100)+1;
            moleType = (randomNumber>=1 && randomNumber<=50)?
                        RED_MOLE.id
                        :(randomNumber>=51 && randomNumber<=90)?
                        BLUE_MOLE.id
                        :(randomNumber>=91 && randomNumber<=100)?
                        GOLD_MOLE.id : NO_MOLE.id;
        }

        return moleType;
    }

    const getMoleCssClass = (moleType,isHit) => {
        let cssClassName = '';
        switch(moleType){
            case RED_MOLE.id:  cssClassName=isHit? RED_MOLE.classNameHit  : RED_MOLE.className ; break;
            case BLUE_MOLE.id: cssClassName=isHit? BLUE_MOLE.classNameHit : BLUE_MOLE.className; break; 
            case GOLD_MOLE.id: cssClassName=isHit? GOLD_MOLE.classNameHit : GOLD_MOLE.className; break; 
            default: cssClassName=isHit? NO_MOLE.classNameHit : NO_MOLE.className;
        }

        return cssClassName;
    }

    const handleClick = () =>{
        if(!lockMole){
            clearTimeout(MainTimerId.current);
            activeMole.current = --activeMole.current;
            setMoleState({...moleState, position: IN_STATE, type:NO_MOLE.id});
            molePoints(moleState.type);
            divMoleItem.current.classList.add(getMoleCssClass(moleState.type,1));
            goInAnimation();
        }
    }

    return (
        <div className="mole" onClick={(moleState.position===OUT_STATE)? handleClick : ()=>{}}>
            <div className="mole__hole-back-face"></div>
            <div ref={divMoleItem} className="mole__image"></div>
            <div className="mole__hole-front-face"></div>
        </div>
    );
}

export default Mole;