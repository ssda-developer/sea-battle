import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Owner } from './store/area/interfaces';

import { RootStore } from './store/store';
import { changeGameStatus } from './store/game/actions';

import Area from './components/Area/Area';
import Rules from './components/Rules/Rules';

import './App.scss';

const Game: FC = () => {
    const dispatch = useDispatch();
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const { User, Computer } = Owner;

    const startGameHandler = () => {
        dispatch(changeGameStatus(true));
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
