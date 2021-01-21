import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../redux/store';
import { changeSquare, changeOwns } from '../../redux/Area/areaActions';
import { IOwns } from '../../redux/Area/areaInterfaces';
import { IField } from '../../redux/Field/fieldInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import Field from '../Field/Field';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    const dispatch = useDispatch();
    const area = useSelector((state: RootStore) => state.areaReducer);

    if (area.square.length === 0) {
        const square: Array<IField> = [];

        AREA_NUMBERS.forEach(number => {
            AREA_LETTERS.forEach(letter => {
                const cell = {
                    id: `${letter}${number}`,
                    ship: false,
                    hit: false,
                    past: false,
                };

                square.push(cell);
            });
        });

        dispatch(changeSquare(square));
        dispatch(changeOwns(owns));
    }

    const clickHandler = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
        // TODO: need refactoring.
        area.square.forEach((cell, ind) => {
            if (cell.id === currentTarget.id) {
                area.square[ind] = { id: cell.id, ship: true, hit: true, past: true };
            }
        });
        dispatch(changeSquare(area.square));
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
                {area.square.map(({ id, ship, hit, past }) => (
                    <Field key={id} id={id} hit={hit} ship={ship} past={past} onChangeField={clickHandler} />
                ))}
            </div>
        </div>
    );
};

export default Area;
