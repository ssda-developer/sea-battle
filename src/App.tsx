import React, { FC } from 'react';
import Area from './components/Area/Area';
import './App.scss';

const Game: FC = () => {
    return (
        <div className="sea-battle">
            <Area />
        </div>
    );
};

export default Game;
