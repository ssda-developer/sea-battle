import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { ChangeSquare, ChangeOwns } from '../../redux/Area/areaActions';
import { IOwns } from '../../redux/Area/areaInterfaces';
import { IField } from '../../redux/Field/fieldInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

import Field from '../Field/Field';

import './Area.scss';

const Area: FC<IOwns> = (owns: IOwns) => {
    const dispatch = useDispatch();

    const square: Array<IField> = [];

    AREA_NUMBERS.forEach(number => {
        AREA_LETTERS.forEach(letter => {
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
    dispatch(ChangeOwns(owns));

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
                {square.map(({ name, ship, hit, past }) => (
                    <Field key={name} name={name} hit={hit} ship={ship} past={past} />
                ))}
            </div>
        </div>
    );
};

export default Area;
