import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/MoleBoard.scss';
import Mole from './Mole';
import Config from '../config';

const MoleBoard = ({clock,gameInfo,setGameInfo}) => {

    const activeMole = useRef(0);
    const [score,setScore] = useState(0);
    const [lockMole,setLockMole] = useState(0)

    useEffect(() => {
        setGameInfo({...gameInfo, score});
    },[score]);

    useEffect( () => {
        if(!clock){
            setScore(0);
            setLockMole(1);
        }else if(clock===Config.INIT_TIME){
            setLockMole(0);
        }
    },[clock]);

    const molePoints = (moleId) => {
        let points = 0;
        
        switch(moleId){
            case Config.RED_MOLE.id:  points=Config.RED_MOLE.points;  break;
            case Config.BLUE_MOLE.id: points=Config.BLUE_MOLE.points; break;
            case Config.GOLD_MOLE.id: points=Config.GOLD_MOLE.points; break;
            default: points=0;
        }

        setScore(score+points);
    }

    return (
        <div className="mole-board">
            {
                Array(Config.MOLE_NUMBER).fill(0).map( 
                    (val,ndx) => (
                        <Mole 
                            key={ndx}
                            lockMole={lockMole}
                            molePoints={molePoints}
                            activeMole={activeMole}
                        />
                    )
                )
            }
        </div>
    );
}

export default MoleBoard;