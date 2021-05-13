import React, { FC, memo } from 'react';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import Field from '../Field';
import Ships from '../Ships/Ships';

import { StyledArea, StyledAreaContainer, StyledAreaLetters, StyledAreaNumbers } from './styles';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
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
                <Field fieldOwner={areaOwner} />
            </StyledAreaContainer>
        </StyledArea>
    );
};

export default memo(Area);
