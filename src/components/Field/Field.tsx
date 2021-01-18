import React, { FC } from 'react';
import './Field.scss';

interface IFieldProps {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

const Field: FC<IFieldProps> = ({ name, ship, hit, past }: IFieldProps) => {
    const clickHandler = ({ target }: any) => {
        console.log(target.innerHTML);
    };

    return (
        <button type="button" className="field" onClick={clickHandler}>
            {name}
            {ship}
            {hit}
            {past}
        </button>
    );
};

export default Field;
