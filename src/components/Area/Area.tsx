import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootStore } from '../../store';
import { IOwns } from '../../reducers/areaReducer';
import Field from '../Field/Field';
import ChangeSquare from '../../actions/areaActions';
import { ISquare } from '../../actions/areaActionsTypes';

import './Area.scss';

const Area: FC<IOwns> = ({ owns }: IOwns) => {
    const dispatch = useDispatch();

    const numbers = useSelector((state: RootStore) => state.temporaryReducer.numbers);
    const letters = useSelector((state: RootStore) => state.temporaryReducer.letters);
    const square: ISquare[] = [];

    numbers.forEach(number => {
        letters.forEach(letter => {
            const cell = {
                name: `${letter}${number}`,
                ship: false,
                hit: false,
                past: false,
            };

            square.push(cell);
        });
    });

    dispatch(ChangeSquare(square));

    return (
        <div className="area">
            <div className="area__letters">
                {letters.map(letter => (
                    <div className="field" key={letter}>
                        {letter}
                    </div>
                ))}
            </div>
            <div className="area__numbers">
                {numbers.map(number => (
                    <div className="field" key={number}>
                        {number}
                    </div>
                ))}
            </div>
            <div className="area__wrapper">
                {square.map(({ name, ship, hit, past }) => (
                    <Field key={name} name={name} hit={hit} ship={ship} past={past} />
                ))}
            </div>
        </div>
    );
};

export default Area;
