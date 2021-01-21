import React, { FC, MouseEvent } from 'react';

import { IField } from '../../redux/Field/fieldInterfaces';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, hit, past, onChangeField }: IField) => {
    return (
        <button type="button" id={id} className={`field ${hit ? 'hit' : ''}`} onClick={onChangeField}>
            {id}
            {ship}
            {hit}
            {past}
        </button>
    );
};

export default Field;
