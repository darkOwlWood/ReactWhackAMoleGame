import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/Mole.scss';
import Config from '../config';

const Mole = ({lockMole,activeMole,molePoints}) => {

    const divMoleItem = useRef(null);
    const MainTimerId = useRef(null);
    const [moleState, setMoleState] = useState({position: Config.IN_STATE, type:Config.NO_MOLE.id});

    useEffect(() => {
        if(lockMole){
            console.log('Block');
            clearTimeout(MainTimerId.current);
            activeMole.current = 0;
            setMoleState({position: Config.IN_STATE, type:Config.NO_MOLE.id});
            goInAnimation();
        }
    },[lockMole]);

    useEffect(() => {
        if(!lockMole){
            MainTimerId.current = setTimeout(moleCicle,Config.MOLE_WAIT_TIME[Math.floor(Math.random()*Config.MOLE_WAIT_TIME.length)]);
        }
    },[moleState,lockMole]);
    
    function moleCicle(){
        if(moleState.position===Config.IN_STATE && activeMole.current<Config.MAX_MOLE){
            const type = getMoleType();
            if(type!==Config.NO_MOLE.id){
                activeMole.current = ++activeMole.current 
                setMoleState({...moleState, position:Config.OUT_STATE, type});
                goOutAnimation(type);
            }else{
                setMoleState({...moleState});
            }
        }else if(moleState.position===Config.OUT_STATE){
            activeMole.current = --activeMole.current;
            setMoleState({...moleState, position: Config.IN_STATE, type:Config.NO_MOLE.id});
            goInAnimation();
        }else{
            setMoleState({...moleState});
        }
    }

    function goOutAnimation(type){
        divMoleItem.current.classList.remove(Config.NO_MOLE.className,Config.RED_MOLE.className,Config.BLUE_MOLE.className,Config.GOLD_MOLE.className);
        divMoleItem.current.classList.remove(Config.NO_MOLE.classNameHit,Config.RED_MOLE.classNameHit,Config.BLUE_MOLE.classNameHit,Config.GOLD_MOLE.classNameHit);
        divMoleItem.current.classList.remove(Config.MOLE_TRANSITION.className);
        divMoleItem.current.classList.add(getMoleCssClass(type));
    }

    function goInAnimation(){
        divMoleItem.current.classList.add(Config.MOLE_TRANSITION.className);
    }
    
    function getMoleType(){
        let moleType = Config.NO_MOLE.id;

        if(Math.floor(Math.random()*2)){
            const randomNumber = Math.floor(Math.random()*100)+1;
            moleType = (randomNumber>=1 && randomNumber<=50)?
                        Config.RED_MOLE.id
                        :(randomNumber>=51 && randomNumber<=90)?
                        Config.BLUE_MOLE.id
                        :(randomNumber>=91 && randomNumber<=100)?
                        Config.GOLD_MOLE.id : Config.NO_MOLE.id;
        }

        return moleType;
    }

    const getMoleCssClass = (moleType,isHit) => {
        let cssClassName = '';
        switch(moleType){
            case Config.RED_MOLE.id:  cssClassName=isHit? Config.RED_MOLE.classNameHit  : Config.RED_MOLE.className ; break;
            case Config.BLUE_MOLE.id: cssClassName=isHit? Config.BLUE_MOLE.classNameHit : Config.BLUE_MOLE.className; break; 
            case Config.GOLD_MOLE.id: cssClassName=isHit? Config.GOLD_MOLE.classNameHit : Config.GOLD_MOLE.className; break; 
            default: cssClassName=isHit? Config.NO_MOLE.classNameHit : Config.NO_MOLE.className;
        }

        return cssClassName;
    }

    const handleClick = () =>{
        if(!lockMole){
            clearTimeout(MainTimerId.current);
            activeMole.current = --activeMole.current;
            setMoleState({...moleState, position: Config.IN_STATE, type:Config.NO_MOLE.id});
            molePoints(moleState.type);
            divMoleItem.current.classList.add(getMoleCssClass(moleState.type,1));
            goInAnimation();
        }
    }

    return (
        <div className="mole" onClick={(moleState.position===Config.OUT_STATE)? handleClick : ()=>{}}>
            <div className="mole__hole-back-face"></div>
            <div ref={divMoleItem} className="mole__image"></div>
            <div className="mole__hole-front-face"></div>
        </div>
    );
}

export default Mole;