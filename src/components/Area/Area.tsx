import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import { renderSquare, changeOwns } from '../../redux/Area/areaActions';
import { IOwns } from '../../redux/Area/areaInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import { createSquare, addShip } from '../../redux/Area/areaUtils';

import FieldRow from '../FieldRow/FieldRow';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    useEffect(() => {
        const square = createSquare();

        dispatch(renderSquare(square));
        dispatch(changeOwns(owns));
    }, []);

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        dispatch(renderSquare(addShip(areaState.square, id)));
    };

    return (
        <div className="area">
            <div className="area__letters">
                {AREA_LETTERS.map(letter => (
                    <div className="field" key={letter}>
                        {letter}
                    </div>
                ))}
            </div>
            <div className="area__numbers">
                {AREA_NUMBERS.map(number => (
                    <div className="field" key={number}>
                        {number}
                    </div>
                ))}
            </div>
            <div className="area__wrapper">
                {areaState.square.map((row, idx) => (
                    <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} />
                ))}
            </div>
        </div>
    );
};

export default Area;
