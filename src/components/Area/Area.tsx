import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import Field from '../Field';
import Ships from '../Ships/Ships';

import {
    StyledAreaDiv,
    StyledAreaContainerDiv,
    StyledAreaLettersDiv,
    StyledAreaNumbersDiv,
    StyledAreaWrapperDiv,
} from './styles';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const fieldClassNameDisabled =
        (areaOwner === User && gameStart) || (areaOwner === Computer && !gameStart) || currentPlayer === Computer;

    return (
        <StyledAreaDiv>
            <Ships shipsOwner={areaOwner} />
            <StyledAreaContainerDiv>
                <StyledAreaLettersDiv>
                    <AreaAxes array={AREA_LETTERS} />
                </StyledAreaLettersDiv>
                <StyledAreaNumbersDiv>
                    <AreaAxes array={AREA_NUMBERS} />
                </StyledAreaNumbersDiv>
                <StyledAreaWrapperDiv isDisabled={fieldClassNameDisabled}>
                    <Field fieldOwner={areaOwner} />
                </StyledAreaWrapperDiv>
            </StyledAreaContainerDiv>
        </StyledAreaDiv>
    );
};

export default Area;
