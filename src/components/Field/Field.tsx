import React, { FC } from 'react';

import { IField } from '../../store/field/interfaces';

import './Field.scss';
import { Owner } from '../../store/area/interfaces';

const Field: FC<IField> = ({ id, ship, shipId, hit, past, locked, lockedId, explode, updateCellHandler, owner }: IField) => {
    const { User } = Owner;
    const disabled = owner === User ? hit || ship || past || locked : false;
    const className =
        owner === User
            ? `field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `field${hit ? ' hit' : ''}${past ? ' past' : ''}${explode ? ' explode' : ''}`;

    return (
        <button
            type="button"
            id={id}
            className={className}
            onClick={updateCellHandler}
            aria-label={id}
            disabled={disabled}
            // data-ship-id={shipId}
            // data-locked-id={lockedId}
        />
    );
};

export default Field;
