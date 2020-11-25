import React, { useState, useRef, useEffect } from 'react';
import '../assets/style/components/MoleBoard.scss';
import Mole from './Mole';

const MOLE_NUMBER = 16;
const RED_MOLE  = {id:0, points: 100};
const BLUE_MOLE = {id:1, points: 150};
const GOLD_MOLE = {id:2, points: 300};

const MoleBoard = ({clock,gameStats,setGameStats}) => {

    const activeMole = useRef(0);
    const [score,setScore] = useState(0);
    const [stopMoles,setStopMoles] = useState(0);

    useEffect(() => {
        setGameStats({...gameStats, score});
    },[score]);

    useEffect( () => {
        if(!clock){
            setStopMoles(1);
        }
    },[clock]);

    const molePoints = (moleId) => {
        let points = 0;
        
        switch(moleId){
            case RED_MOLE.id:  points=RED_MOLE.points;  break;
            case BLUE_MOLE.id: points=BLUE_MOLE.points; break;
            case GOLD_MOLE.id: points=GOLD_MOLE.points; break;
            default: points=0;
        }

        setScore(score+points);
    }

    return (
        <div className="mole-board">
            {
                !stopMoles?
                Array(MOLE_NUMBER).fill(0).map( 
                    (val,ndx) => (
                        <Mole 
                            key={ndx}
                            molePoints={molePoints}
                            activeMole={activeMole}
                        />
                    )
                )
                :''
            }
        </div>
    );
}

export default MoleBoard;