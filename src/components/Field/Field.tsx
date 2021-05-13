import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';
import useActions from '../../hooks';

import { Owners } from '../../enums';
import { ICell } from '../../interface';

import { createField } from '../../utils/field';

import CellRow from '../CellRow/CellRow';

import { StyledField } from './styles';

interface IFieldProps {
    fieldOwner: Owners;
}

const Field: FC<IFieldProps> = ({ fieldOwner }: IFieldProps) => {
    const { User, Computer } = Owners;

    const { renderUserField, renderComputerField } = useActions();

    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const fieldClassNameDisabled =
        (fieldOwner === User && gameStart) || (fieldOwner === Computer && !gameStart) || currentPlayer === Computer;

    const currentField = fieldOwner === User ? userField : computerField;

    useEffect(() => {
        renderUserField(createField());
        renderComputerField(createField());
    }, []);

    return (
        <StyledField isDisabled={fieldClassNameDisabled}>
            {currentField.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} cellRowOwner={fieldOwner} />
            ))}
        </StyledField>
    );
};

export default Field;
