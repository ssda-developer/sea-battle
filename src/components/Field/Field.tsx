import React, { FC } from 'react';

import { IField } from '../../store/field/interfaces';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, shipId, hit, past, locked, lockedId, explode, updateCellHandler }: IField) => {
    const disabled = hit || ship || past || locked;

    return (
        <button
            type="button"
            id={id}
            className={`field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${
                explode ? ' explode' : ''
            }`}
            onClick={updateCellHandler}
            disabled={disabled}
            data-ship-id={shipId}
            data-locked-id={lockedId}
        >
            {id}
            {/* {shipId} */}
        </button>
    );
};

export default Field;
