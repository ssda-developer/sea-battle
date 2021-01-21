import React, { FC } from 'react';

import { IField } from '../../redux/Field/fieldInterfaces';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, hit, past, updateCellHandler }: IField) => {
    return (
        <button
            type="button"
            id={id}
            className={`field ${hit ? 'hit' : ''} ${past ? 'past' : ''}`}
            onClick={updateCellHandler}
            disabled={past}
        >
            {id}
            {ship}
            {hit}
            {past}
        </button>
    );
};

export default Field;
