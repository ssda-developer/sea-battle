import React, { FC } from 'react';

import { Owns } from './redux/Area/areaInterfaces';

import Area from './components/Area/Area';
import Ships from './components/Ships/Ships';

import './App.scss';

const Game: FC = () => {
    return (
        <div className="sea-battle">
            <Ships />
            <Area owns={Owns.Friendly} />
            {/* <Area owns={Owns.Enemy} /> */}
        </div>
    );
};

export default Game;
