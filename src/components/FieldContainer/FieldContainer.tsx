import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Owners } from '../../enums';
import useActions from '../../hooks';

import { RootStore } from '../../store';

import { createField } from '../../utils/field';

import Field from '../Field';

import { StyledFieldContainer } from './styles';

interface IFieldContainerProps {
    fieldContainerOwner: Owners;
}

const FieldContainer: FC<IFieldContainerProps> = ({ fieldContainerOwner }: IFieldContainerProps) => {
    const { User, Computer } = Owners;

    const { renderUserField, renderComputerField } = useActions();

    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    useEffect(() => {
        renderComputerField(createField());
        renderUserField(createField());
    }, []);

    const fieldClassNameDisabled =
        (fieldContainerOwner === User && gameStart) ||
        (fieldContainerOwner === Computer && !gameStart) ||
        currentPlayer === Computer;

    const currentField = fieldContainerOwner === User ? userField : computerField;

    return (
        <StyledFieldContainer isDisabled={fieldClassNameDisabled}>
            <Field fieldOwner={fieldContainerOwner} fieldArray={currentField} />
        </StyledFieldContainer>
    );
};

export default FieldContainer;
