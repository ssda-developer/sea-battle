import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IField } from '../../../redux/Field/fieldInterfaces';
import { IOwns, Owns } from '../../../redux/Area/areaInterfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import { addShip, updateCell } from '../../../redux/Area/areaUtils';

import { RootStore } from '../../../redux/store';
import { renderEnemySquare, renderFriendlySquare } from '../../../redux/Area/areaActions';

import FieldRow from '../../FieldRow/FieldRow';

interface BuildSquareProps {
    playerAffiliation: IOwns;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation }: BuildSquareProps) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    const { friendlySquare, enemySquare } = areaState.squares;
    const square: Array<Array<IField>> = [];

    // const currentSquare = playerAffiliation.owns === Owns.Friendly ? friendlySquare : enemySquare;

    const createSquare = () => {
        AREA_NUMBERS.forEach(number => {
            const row: Array<IField> = [];

            AREA_LETTERS.forEach(letter => {
                const cell = {
                    id: `${number}${letter}`,
                    ship: false,
                    shipId: '',
                    hit: false,
                    past: false,
                    locked: false,
                    lockedId: '',
                };

                row.push(cell);
            });

            square.push(row);
        });

        return square;
    };

    useEffect(() => {
        const currentSquare = createSquare();
        dispatch(renderFriendlySquare(currentSquare));
        dispatch(renderEnemySquare(currentSquare));
    }, []);

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        if (playerAffiliation.owns === 'FRIENDLY') {
            dispatch(renderFriendlySquare(addShip(friendlySquare, id)));
        } else {
            dispatch(renderEnemySquare(updateCell(friendlySquare, id)));
        }
    };

    return (
        <>
            {friendlySquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} />
            ))}
        </>
    );
};

export default BuildSquare;
