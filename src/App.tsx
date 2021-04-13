import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Owner } from './store/area/interfaces';

import { changeGameStatus } from './store/game/actions';

import Area from './components/Area/Area';
import Hints from './components/Hints/Hints';

import './App.scss';

const Game: FC = () => {
    const dispatch = useDispatch();

    const startGameHandler = () => {
        dispatch(changeGameStatus(true));
    };

    const hint = 'Расстановка кораблей';

    return (
        <div className="sea-battle">
            <Hints hintText={hint} />
            <div className="sea-battle__container">
                <Area owner={Owner.User} />
                <Area owner={Owner.Computer} />
            </div>
            <button type="button" onClick={startGameHandler}>
                Start game
            </button>
        </div>
    );
};

export default Game;
