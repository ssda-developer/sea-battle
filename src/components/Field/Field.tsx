import React, { FC } from 'react';

import { IField } from '../../store/field/interfaces';
import { Owners } from '../../store/area/interfaces';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, hit, past, locked, explode, updateCellHandler, owner }: IField) => {
    const { User } = Owners;
    const disabled = owner === User ? hit || ship || past || locked : hit || past || explode;

    const className =
        owner === User
            ? `field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `field${hit ? ' hit' : ''}${past ? ' past' : ''}${explode ? ' explode' : ''}`;

    return <button type="button" id={id} className={className} onClick={updateCellHandler} aria-label={id} disabled={disabled} />;
};

export default Field;
