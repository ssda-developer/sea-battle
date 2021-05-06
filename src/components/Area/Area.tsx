import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { AREA_LETTERS, AREA_NUMBERS } from '../../constants';
import { Owners } from '../../enums';

import AreaAxes from '../AreaAxes';
import Field from '../Field';
import Ships from '../Ships/Ships';

import './Area.scss';

import { AreaDiv, AreaContainerDiv, AreaLettersDiv, AreaNumbersDiv, AreaWrapperDiv } from './styles';

interface AreaProps {
    areaOwner: Owners;
}

const Area: FC<AreaProps> = ({ areaOwner }: AreaProps) => {
    const { User, Computer } = Owners;

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    const fieldClassNameDisabled =
        (areaOwner === User && gameStart) || (areaOwner === Computer && !gameStart) || currentPlayer === Computer;

    return (
        <AreaDiv className={`${areaOwner.toLowerCase()}`} aOwner={areaOwner}>
            <Ships shipsOwner={areaOwner} />
            <AreaContainerDiv>
                <AreaLettersDiv>
                    <AreaAxes array={AREA_LETTERS} />
                </AreaLettersDiv>
                <AreaNumbersDiv>
                    <AreaAxes array={AREA_NUMBERS} />
                </AreaNumbersDiv>
                <AreaWrapperDiv isDisabled={fieldClassNameDisabled}>
                    <Field fieldOwner={areaOwner} />
                </AreaWrapperDiv>
            </AreaContainerDiv>
        </AreaDiv>
    );
};

export default Area;
