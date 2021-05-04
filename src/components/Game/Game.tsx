import React, { FC } from 'react';

import { Owners } from '../../enums';

import Area from '../Area';

import './Game.scss';

const Game: FC = () => {
    const { User, Computer } = Owners;

    return (
        <div className="sea-battle">
            <div className="sea-battle__areas">
                <Area areaOwner={User} />
                <Area areaOwner={Computer} />
            </div>
        </div>
    );
};

export default Game;
