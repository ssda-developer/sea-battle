import React, { FC } from 'react';

import Area from './components/Area/Area';
import Ships from './components/Ships/Ships';

import './App.scss';

const Game: FC = () => {
    return (
        <div className="sea-battle">
            <Ships />
            <Area owns="friendly" />
            {/* <Area owns="enemy" /> */}
        </div>
    );
};

export default Game;
