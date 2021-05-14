import React, { FC, memo } from 'react';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import FieldContainer from '../FieldContainer';
import Ships from '../Ships';

import { StyledArea, StyledAreaContainer, StyledAreaLetters, StyledAreaNumbers } from './styles';

interface IAreaProps {
    areaOwner: Owners;
}

const Area: FC<IAreaProps> = ({ areaOwner }: IAreaProps) => {
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
                <FieldContainer fieldContainerOwner={areaOwner} />
            </StyledAreaContainer>
        </StyledArea>
    );
};

export default memo(Area);
