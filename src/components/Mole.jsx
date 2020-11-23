import React from 'react';
import '../assets/style/components/Mole.scss';

const Mole = ({id,pattern,onClick}) => {

    // const handleClick = () => { 
    //     console.log(`Mole id ${id}`);
    // }

    return (
        <div className={`mole ${pattern[id]? 'mole--active':''}`} onClick={pattern[id]? () => onClick(id) : ()=>{}}>

        </div>
    );
}

export default React.memo(Mole);