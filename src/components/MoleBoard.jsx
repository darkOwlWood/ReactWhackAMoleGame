import React, { useState, useEffect } from 'react';
import '../assets/style/components/MoleBoard.scss';
import Mole from './Mole';

const MOLE_NUMBER = 9;

const MoleBoard = () => {

    const [pattern, setPatter] = useState(Array(MOLE_NUMBER).fill(0).map( () => Math.floor(Math.random()*2) ));

    useEffect(() => {
        setTimeout( () => setPatter(Array(MOLE_NUMBER).fill(0)) ,15000)
    },[]);

    const hitMole = (id) => {
        const pattern_copy = [...pattern];
        pattern_copy[id] = 0;
        setPatter(pattern_copy);
    }

    return (
        <div className="mole-board">
            {
                Array(9).fill(0).map( 
                    (val,ndx) => (
                        <Mole 
                            key={ndx} 
                            id={ndx}
                            pattern={pattern}
                            onClick={hitMole}
                        />
                    )
                )
            }
        </div>
    );
}

export default MoleBoard;