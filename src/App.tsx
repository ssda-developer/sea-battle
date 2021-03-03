import React, { FC } from 'react';

import { Owner } from './store/area/interfaces';

import Area from './components/Area/Area';
import Ships from './components/Ships/Ships';

import './App.scss';

const Game: FC = () => {
    return (
        <div className="sea-battle">
            <Ships />
            <Area owner={Owner.User} />
            <Area owner={Owner.Computer} />
        </div>
    );
};

export default Game;
