import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Field from '../Field/Field';
import './Area.scss';
import { RootStore } from '../../store';
import { messageHit } from '../../actions/temporaryActions';

interface IAreaProps {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

const Area: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(messageHit());
    }, []);

    const numbers = useSelector((state: RootStore) => state.temporaryReducer.numbers);
    const letters = useSelector((state: RootStore) => state.temporaryReducer.letters);
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
