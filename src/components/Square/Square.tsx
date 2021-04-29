import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../interface/field';
import { Owners } from '../../interface/area';

import { createSquare } from '../../utils/areaUtils';
import randomShipPlacement from '../../utils/randomShipPlacement';

import FieldRow from '../FieldRow/FieldRow';

import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';

interface BuildSquareProps {
    playerAffiliation: Owners;
}

const Square: FC<BuildSquareProps> = ({ playerAffiliation }: BuildSquareProps) => {
    const { RenderUserSquare, RenderComputerSquare } = useActions();
    const { User } = Owners;
    const {
        user: { userSquare },
        computer: { computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentSquare = playerAffiliation === User ? userSquare : computerSquare;

    useEffect(() => {
        RenderUserSquare(createSquare());
        RenderComputerSquare(randomShipPlacement(createSquare()));
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
