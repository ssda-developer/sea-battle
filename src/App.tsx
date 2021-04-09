import React, { FC } from 'react';

import { Owner } from './store/area/interfaces';

import Area from './components/Area/Area';
import Ships from './components/Ships/Ships';

import './App.scss';

const Game: FC = () => {
    const startGameEvent = () => {
        console.log('start game');
    };

    return (
        <div className="sea-battle">
            <Ships />
            <Area owner={Owner.User} />
            <Area owner={Owner.Computer} />
            <button type="button" onClick={startGameEvent}>
                Start game
            </button>
        </div>
    );
};

export default Game;
