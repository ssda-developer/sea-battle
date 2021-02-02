import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import { renderFriendlySquare, renderEnemySquare, changeOwns } from '../../redux/Area/areaActions';
import { IOwns, Owns } from '../../redux/Area/areaInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import { createSquare, addShip, updateCell } from '../../redux/Area/areaUtils';

import BuildSquare from '../Square/BuildSquare/BuildSquare';
import FieldRow from '../FieldRow/FieldRow';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);
    const shipsState = useSelector((state: RootStore) => state.shipsReducer);

    let { friendlySquare, enemySquare } = areaState.squares;

    useEffect(() => {
        friendlySquare = createSquare();
        enemySquare = createSquare();

        dispatch(renderFriendlySquare(friendlySquare));
        dispatch(renderEnemySquare(enemySquare));
        dispatch(changeOwns(owns));
    }, []);

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;
        const { currentShip } = shipsState;
        if (owns.owns === 'FRIENDLY') {
            dispatch(renderFriendlySquare(addShip(friendlySquare, id)));
        } else {
            dispatch(renderEnemySquare(updateCell(friendlySquare, id)));
        }
    };

    const currentSquare = owns.owns === Owns.Friendly ? friendlySquare : enemySquare;

    return (
        <div className="area">
            <div className="area__letters">
                {AREA_LETTERS.map(letter => (
                    <div className="field" key={letter}>
                        {letter.toLocaleUpperCase()}
                    </div>
                ))}
            </div>
            <div className="area__numbers">
                {AREA_NUMBERS.map(number => (
                    <div className="field" key={number}>
                        {number.toUpperCase()}
                    </div>
                ))}
            </div>
            <div className="area__wrapper">
                <BuildSquare cellHandler={updateCellHandler} />
                {currentSquare.map((row, idx) => (
                    <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} />
                ))}
            </div>
        </div>
    );
};

export default Area;
