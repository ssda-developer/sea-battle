import React, { FC } from 'react';

import { IField } from '../../redux/Field/fieldInterfaces';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, hit, past, locked, updateCellHandler }: IField) => {
    const disabled = hit || ship || past || locked;

    return (
        <button
            type="button"
            id={id}
            className={`field ${hit ? 'hit' : ''} ${past ? 'past' : ''} ${ship ? 'ship' : ''} ${locked ? 'locked' : ''}`}
            onClick={updateCellHandler}
            disabled={disabled}
        >
            {id}
            {ship}
            {hit}
            {past}
        </button>
    );
};

export default Field;
