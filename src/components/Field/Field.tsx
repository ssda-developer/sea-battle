import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ICell } from '../../interface';
import { Owners } from '../../enums';

import { createField } from '../../utils/areaUtils';
import randomShipLocations from '../../utils/randomShipLocations';

import CellRow from '../CellRow/CellRow';

import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';

interface BuildFieldProps {
    playerAffiliation: Owners;
}

const Field: FC<BuildFieldProps> = ({ playerAffiliation }: BuildFieldProps) => {
    const { renderUserField, renderComputerField } = useActions();
    const { User } = Owners;
    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentField = playerAffiliation === User ? userField : computerField;

    useEffect(() => {
        renderUserField(createField());
        renderComputerField(randomShipLocations(createField()));
    }, []);

    return (
        <>
            {currentField.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} owner={playerAffiliation} />
            ))}
        </>
    );
};

export default Field;
