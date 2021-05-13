import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { HintOptions, Owners } from '../../enums';

import { StyledHints, StyledHintsText } from './styles';

const Hints: FC = () => {
    const { Computer } = Owners;
    const { PlayerShot, ComputerShot } = HintOptions;

    const { gameStart, currentPlayer } = useSelector(({ gameReducer }: RootStore) => gameReducer);

    return (
        <>
            {gameStart && (
                <StyledHints>
                    <StyledHintsText>{currentPlayer === Computer ? ComputerShot : PlayerShot}</StyledHintsText>
                </StyledHints>
            )}
        </>
    );
};

export default Hints;
