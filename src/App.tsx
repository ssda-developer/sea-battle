import React, { FC } from 'react';

import { Owner } from './store/area/interfaces';

import Area from './components/Area/Area';
import Hints from './components/Hints/Hints';

import './App.scss';

const Game: FC = () => {
    const startGameEvent = () => {
        console.log('start game');
    };

    const hint = 'Расстановка кораблей';

    return (
        <div className="sea-battle">
            <Hints hintText={hint} />
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
