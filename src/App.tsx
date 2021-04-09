import React, { FC } from 'react';

import { Owner } from './store/area/interfaces';

import Area from './components/Area/Area';

import './App.scss';

const Game: FC = () => {
    const startGameEvent = () => {
        console.log('start game');
    };

    return (
        <div className="sea-battle">
            <div className="sea-battle__container">
                <Area owner={Owner.User} />
                <Area owner={Owner.Computer} />
            </div>
            <button type="button" onClick={startGameEvent}>
                Start game
            </button>
        </div>
    );
};

export default Game;
