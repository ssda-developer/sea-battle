import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Owners } from './store/area/interfaces';

import { RootStore } from './store/store';
import useActions from './hooks/useActions';

import randomShipPlacement from './utils/randomShipPlacement';
import { createSquare } from './utils/areaUtils';

import Area from './components/Area/Area';
import Rules from './components/Rules/Rules';

import './App.scss';

const Game: FC = () => {
    const { renderFriendlySquare, renderEnemySquare, changeGameStatus } = useActions();
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);
    const { User, Computer } = Owners;

    const startGameHandler = () => {
        renderFriendlySquare(randomShipPlacement(createSquare()));
        renderEnemySquare(randomShipPlacement(createSquare()));
        changeGameStatus(true);
    };

    return (
        <div className="sea-battle">
            {!gameStatus && <Rules />}
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
