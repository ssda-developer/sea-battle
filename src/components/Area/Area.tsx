import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import Field from '../Field';
import Ships from '../Ships/Ships';

import { StyledArea, StyledAreaContainer, StyledAreaLetters, StyledAreaNumbers, StyledAreaWrapper } from './styles';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const fieldClassNameDisabled =
        (areaOwner === User && gameStart) || (areaOwner === Computer && !gameStart) || currentPlayer === Computer;

    return (
        <StyledArea>
            <Ships shipsOwner={areaOwner} />
            <StyledAreaContainer>
                <StyledAreaLetters>
                    <AreaAxes array={AREA_LETTERS} />
                </StyledAreaLetters>
                <StyledAreaNumbers>
                    <AreaAxes array={AREA_NUMBERS} />
                </StyledAreaNumbers>
                <StyledAreaWrapper isDisabled={fieldClassNameDisabled}>
                    <Field fieldOwner={areaOwner} />
                </StyledAreaWrapper>
            </StyledAreaContainer>
        </StyledArea>
    );
};

export default Area;
