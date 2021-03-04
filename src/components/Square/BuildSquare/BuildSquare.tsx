import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IField } from '../../../store/field/interfaces';
import { IOwner, Owner } from '../../../store/area/interfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import { updateCell } from '../../../store/area/areaUtils';
import randomShipPlacement from '../../../utils/randomShipPlacement';

import { RootStore } from '../../../store/store';
import { renderEnemySquare, renderFriendlySquare } from '../../../store/area/actions';

import FieldRow from '../../FieldRow/FieldRow';
import computerShot from '../../../utils/computerShot';
import addShip from '../../../utils/customShipPlacement';

interface BuildSquareProps {
    playerAffiliation: IOwner;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation: { owner } }: BuildSquareProps) => {
    const dispatch = useDispatch();
    const {
        squares: { userSquare, computerSquare },
    } = useSelector((state: RootStore) => state.areaReducer);

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
            dispatch(renderEnemySquare(randomShipPlacement(currentSquare)));
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
            currentSquare = updateCell(userSquare, id);
            dispatch(renderEnemySquare(currentSquare));
        }
    };

    const enemyHitHandler = () => {
        currentSquare = computerShot(userSquare);
        dispatch(renderFriendlySquare(currentSquare));
    };

    const userBuildRandomShipsHandler = () => {
        currentSquare = createSquare();
        dispatch(renderFriendlySquare(randomShipPlacement(currentSquare)));
    };

    return (
        <>
            {currentSquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} />
            ))}
            <button type="button" onClick={enemyHitHandler}>
                HIT
            </button>
            <button type="button" onClick={userBuildRandomShipsHandler}>
                Build Random Ships
            </button>
        </>
    );
};

export default BuildSquare;
