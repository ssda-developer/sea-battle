import React, { FC } from 'react';

import { Owners } from './store/area/interfaces';

import Area from './components/Area/Area';

import './App.scss';

const Game: FC = () => {
    const { User, Computer } = Owners;

    return (
        <div className="sea-battle">
            <div className="sea-battle__container">
                <div className="sea-battle__wrapper">
                    <div className="sea-battle__areas">
                        <Area owner={User} />
                        <Area owner={Computer} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
