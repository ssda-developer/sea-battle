import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks/useActions';

import { Owners } from '../../enums';
import { ICell } from '../../interface';

import { createField } from '../../utils/field';

import CellRow from '../CellRow/CellRow';

interface IFieldProps {
    fieldOwner: Owners;
}

const Field: FC<IFieldProps> = ({ fieldOwner }: IFieldProps) => {
    const { User } = Owners;

    const { renderUserField, renderComputerField } = useActions();

    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentField = fieldOwner === User ? userField : computerField;

    useEffect(() => {
        renderUserField(createField());
        renderComputerField(createField());
    }, []);

    return (
        <>
            {currentField.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} cellRowOwner={fieldOwner} />
            ))}
        </>
    );
};

export default Field;
