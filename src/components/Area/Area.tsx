import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store/reducer';
import Field from '../Field/Field';
import './Area.scss';

interface IAreaProps {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

const Area: FC = () => {
    const [numbers, setNumber] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    const [letters, setLetters] = useState<string[]>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);

    const areas = useSelector<IState>(state => state);

    console.log(areas);

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
                    <span key={letter}>{letter}</span>
                ))}
            </div>
            <div className="area__numbers">
                {numbers.map(number => (
                    <span key={number}>{number}</span>
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
