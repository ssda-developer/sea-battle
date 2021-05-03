import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ICell } from '../../interface';
import { Owners } from '../../enums';

import randomLocationShips from '../../utils/randomLocationShips';

import CellRow from '../CellRow/CellRow';

import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';
import { createField } from '../../utils/field';

interface BuildFieldProps {
    fieldOwner: Owners;
}

const Field: FC<BuildFieldProps> = ({ fieldOwner }: BuildFieldProps) => {
    const { renderUserField, renderComputerField } = useActions();
    const { User } = Owners;
    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentField = fieldOwner === User ? userField : computerField;

    useEffect(() => {
        renderUserField(createField());
        renderComputerField(randomLocationShips(createField()));
    }, []);

    return (
        <>
            {currentField.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} owner={fieldOwner} />
            ))}
        </>
    );
};

export default Field;
