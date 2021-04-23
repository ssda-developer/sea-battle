import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../store/field/interfaces';
import { Owners } from '../../store/area/interfaces';

import { RootStore } from '../../store/store';

import './Field.scss';

const Field: FC<IField> = ({ id, ship, hit, past, locked, explode, updateCellHandler, owner }: IField) => {
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);
    const { owner: currentOwner } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { User, Computer } = Owners;
    let disabled = owner === User ? hit || ship || past || locked : false;
    const className =
        owner === User
            ? `field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `field${hit ? ' hit' : ''}${past ? ' past' : ''}${explode ? ' explode' : ''}`;

    if ((owner === Computer && !gameStatus) || currentOwner === Computer) {
        disabled = true;
    }

    return <button type="button" id={id} className={className} onClick={updateCellHandler} aria-label={id} disabled={disabled} />;
};

export default Field;
