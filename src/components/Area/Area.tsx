import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Field from '../Field/Field';
import './Area.scss';
import { RootState } from '../../reducers';

interface IAreaProps {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

const Area: FC = () => {
    const numbers = useSelector((state: RootState) => state.temporaryReducer.numbers);
    const letters = useSelector((state: RootState) => state.temporaryReducer.letters);
    const square: IAreaProps[] = [];

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

    return (
        <div className="area__wrapper">
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
            <div className="area">
                {square.map(({ name, ship, hit, past }) => (
                    <Field key={name} name={name} hit={hit} ship={ship} past={past} />
                ))}
            </div>
        </div>
    );
};

export default Area;
