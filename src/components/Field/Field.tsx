import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ICell } from '../../interface';
import { Owners } from '../../enums';

import { createSquare } from '../../utils/areaUtils';
import randomShipLocations from '../../utils/randomShipLocations';

import CellRow from '../CellRow/CellRow';

import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';

interface BuildSquareProps {
    playerAffiliation: Owners;
}

const Field: FC<BuildSquareProps> = ({ playerAffiliation }: BuildSquareProps) => {
    const { renderUserSquare, renderComputerSquare } = useActions();
    const { User } = Owners;
    const {
        user: { userSquare },
        computer: { computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const currentSquare = playerAffiliation === User ? userSquare : computerSquare;

    useEffect(() => {
        renderUserSquare(createSquare());
        renderComputerSquare(randomShipLocations(createSquare()));
    }, []);

    return (
        <>
            {currentSquare.map((row: ICell[], idx: number) => (
                <CellRow key={row[idx].id} row={row} owner={playerAffiliation} />
            ))}
        </>
    );
};

export default Field;
