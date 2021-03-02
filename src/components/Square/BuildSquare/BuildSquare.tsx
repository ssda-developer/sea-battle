import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IField } from '../../../store/field/interfaces';
import { IOwns, Owns } from '../../../store/area/interfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import { addShip, updateCell } from '../../../store/area/areaUtils';
import { buildRandomShip } from '../../utils/botUtils';
import { iteratingFlatArray } from '../../../helpers';

import { RootStore } from '../../../store/store';
import { renderEnemySquare, renderFriendlySquare } from '../../../store/area/actions';

import FieldRow from '../../FieldRow/FieldRow';
import enemyHit from '../../utils/botHit';

interface BuildSquareProps {
    playerAffiliation: IOwns;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation: { owns } }: BuildSquareProps) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    const { friendlySquare, enemySquare } = areaState.squares;
    const { Friendly } = Owns;
    const square: Array<Array<IField>> = [];

    let currentSquare = owns === Owns.Friendly ? friendlySquare : enemySquare;

    const createSquare = () => {
        AREA_NUMBERS.forEach(number => {
            const row: Array<IField> = [];

            AREA_LETTERS.forEach(letter => {
                const cell = {
                    id: `${letter}${number}`,
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
        currentSquare = createSquare();

        if (owns === Friendly) {
            dispatch(renderFriendlySquare(currentSquare));
        } else {
            [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].forEach(shipLength => {
                dispatch(renderEnemySquare(buildRandomShip(currentSquare, shipLength)));
            });

            iteratingFlatArray(currentSquare, cell => {
                if (!cell.ship) {
                    cell.locked = true;
                }
            });
        }
    }, []);

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        if (owns === Friendly) {
            dispatch(renderFriendlySquare(addShip(currentSquare, id)));
        } else {
            currentSquare = updateCell(enemySquare, friendlySquare, id);
            dispatch(renderEnemySquare(currentSquare));
        }
    };

    const enemyHitHandler = () => {
        currentSquare = enemyHit(friendlySquare);
        dispatch(renderFriendlySquare(currentSquare));
    };

    const enemyBuildRandomShipsHandler = () => {
        currentSquare = createSquare();

        dispatch(renderFriendlySquare(currentSquare));

        [4, 3, 3, 2, 2, 2, 1, 1, 1, 1].forEach(shipLength => {
            dispatch(renderFriendlySquare(buildRandomShip(currentSquare, shipLength)));
        });
    };

    return (
        <>
            {currentSquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} />
            ))}
            <button type="button" onClick={enemyHitHandler}>
                HIT
            </button>
            <button type="button" onClick={enemyBuildRandomShipsHandler}>
                Build Random Ships
            </button>
        </>
    );
};

export default BuildSquare;
