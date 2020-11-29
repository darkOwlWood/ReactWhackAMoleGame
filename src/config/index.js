const Config = {
    
    GAME_BEGIN: 0,
    GAME_RUNING: 1,
    GAME_LOSS: 2,
    GAME_WIN: 3,
    
    INIT_TIME: 30,
    FINAL_ROUND: 5,
    SCORE_NEEDED: [2000,3000,4000,5000,6000],
    MOLE_NUMBER: 16,
    MAX_MOLE: 8,
    IN_STATE: 0,
    OUT_STATE: 1,
    LVEL_TRANSITION_TIME: 4000,
    
    MOLE_WAIT_TIME: [1500,2000,700],
    GAME_MESSAGES: ['NEXT LEVEL!!','LOSER!','CONGRATULATIONS!!!'],
    
    NO_MOLE: {id:-1, points: 0  , className: 'mole__image--active-zero', classNameHit: 'mole__image--hit_zero'},
    RED_MOLE: {id:0,  points: 100, className: 'mole__image--active-red' , classNameHit: 'mole__image--hit-red' },
    BLUE_MOLE: {id:1,  points: 150, className: 'mole__image--active-blue', classNameHit: 'mole__image--hit-blue'},
    GOLD_MOLE: {id:2,  points: 300, className: 'mole__image--active-gold', classNameHit: 'mole__image--hit-gold'},
    
    FADE_OUT: { className: 'start-button--fade-out', time: 2000 },
    FADE_IN: { className: 'start-button--fade-in', time: 1000 },
    MOVE_TO_RIGHT: {className: 'game-message__item--moveToRight', time: 2500},
    MOVE_TO_LEFT: {className: 'game-message__item--moveToLeft',  time: 2500},
    MOLE_TRANSITION: { className: 'mole__image--inactive', time: 400 },
};

export default Config;