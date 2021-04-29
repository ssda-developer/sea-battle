import React, { FC } from 'react';

import { Owners } from './interface/area';

import Area from './components/Area';

import './Game.scss';

const Game: FC = () => {
    const { User, Computer } = Owners;

    return (
        <div className="sea-battle">
            <div className="sea-battle__container">
                <div className="sea-battle__wrapper">
                    <div className="sea-battle__areas">
                        <Area areaOwner={User} />
                        <Area areaOwner={Computer} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Game;
