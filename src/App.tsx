import React, { FC } from 'react';

import { Owners } from './store/area/interfaces';

import useActions from './hooks/useActions';

import randomShipPlacement from './utils/randomShipPlacement';
import { createSquare } from './utils/areaUtils';

import Area from './components/Area/Area';

import './App.scss';

const Game: FC = () => {
    const { renderFriendlySquare, renderEnemySquare, changeGameStatus } = useActions();
    const { User, Computer } = Owners;

    const startGameHandler = () => {
        renderFriendlySquare(randomShipPlacement(createSquare()));
        renderEnemySquare(randomShipPlacement(createSquare()));
        changeGameStatus(true);
    };

    return (
        <div className="sea-battle">
            <div className="sea-battle__container">
                <div className="sea-battle__wrapper">
                    <div className="sea-battle__areas">
                        <Area owner={User} />
                        <Area owner={Computer} />
                    </div>
                    <button type="button" onClick={startGameHandler}>
                        Start game
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Game;
