import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers/temporaryReducer';
import Field from '../Field/Field';
import './Area.scss';

interface IAreaProps {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

const Area: FC = () => {
    // const fields = useSelector<IState, IState['temporaryReducer']>(state => state.temporaryReducer);
    const numbers = useSelector<IState, IState['numbers']>(temporaryReducer => temporaryReducer.numbers);
    const letters = useSelector<IState, IState['letters']>(temporaryReducer => temporaryReducer.letters);
    const square: IAreaProps[] = [];

    // console.log(fields);

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
