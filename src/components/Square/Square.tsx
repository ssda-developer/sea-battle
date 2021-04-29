import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../interface';
import { Owners } from '../../enums';

import { createSquare } from '../../utils/areaUtils';
import randomShipPlacement from '../../utils/randomShipPlacement';

import FieldRow from '../FieldRow/FieldRow';

import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';

interface BuildSquareProps {
    playerAffiliation: Owners;
}

const Square: FC<BuildSquareProps> = ({ playerAffiliation }: BuildSquareProps) => {
    const { renderUserSquare, renderComputerSquare } = useActions();
    const { User } = Owners;
    const {
        user: { userSquare },
        computer: { computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentSquare = playerAffiliation === User ? userSquare : computerSquare;

    useEffect(() => {
        renderUserSquare(createSquare());
        renderComputerSquare(randomShipPlacement(createSquare()));
    }, []);

    return (
        <>
            {currentSquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} owner={playerAffiliation} />
            ))}
        </>
    );
};

export default Square;
