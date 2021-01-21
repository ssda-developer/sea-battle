import React, { FC, MouseEvent } from 'react';

import { IField } from '../../redux/Field/FieldInterface';

import './Field.scss';

const Field: FC<IField> = ({ name, ship, hit, past }: IField) => {
    const clickHandler = ({ target }: MouseEvent<HTMLButtonElement>) => {
        console.log((target as HTMLButtonElement).innerHTML);
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
