import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IField } from '../../../store/field/interfaces';
import { IOwner, Owner } from '../../../store/area/interfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import { addShip, updateCell } from '../../../store/area/areaUtils';
import { buildRandomShip } from '../../utils/botUtils';
import { iteratingFlatArray } from '../../../helpers';

import { RootStore } from '../../../store/store';
import { renderEnemySquare, renderFriendlySquare } from '../../../store/area/actions';

import FieldRow from '../../FieldRow/FieldRow';
import enemyHit from '../../utils/botHit';
import { SHIPS } from '../../../constants/shipsConstants';

interface BuildSquareProps {
    playerAffiliation: IOwner;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation: { owner } }: BuildSquareProps) => {
    const dispatch = useDispatch();
    const areaState = useSelector((state: RootStore) => state.areaReducer);

    const { userSquare, computerSquare } = areaState.squares;
    const { User } = Owner;
    const square: Array<Array<IField>> = [];

    let currentSquare = owner === Owner.User ? userSquare : computerSquare;

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
                    explode: false,
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

        if (owner === User) {
            dispatch(renderFriendlySquare(currentSquare));
        } else {
            SHIPS.forEach(shipLength => {
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

        if (owner === User) {
            dispatch(renderFriendlySquare(addShip(currentSquare, id)));
        } else {
            currentSquare = updateCell(computerSquare, userSquare, id);
            dispatch(renderEnemySquare(currentSquare));
        }
    };

    const enemyHitHandler = () => {
        currentSquare = enemyHit(userSquare);
        dispatch(renderFriendlySquare(currentSquare));
    };

    const enemyBuildRandomShipsHandler = () => {
        currentSquare = createSquare();

        dispatch(renderFriendlySquare(currentSquare));

        SHIPS.forEach(shipLength => {
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
