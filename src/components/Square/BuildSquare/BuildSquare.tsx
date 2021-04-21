import React, { FC, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../../store/field/interfaces';
import { IOwner, Owner } from '../../../store/area/interfaces';

import { AREA_LETTERS, AREA_NUMBERS } from '../../../constants/areaConstants';
import { updateCell } from '../../../utils/areaUtils';
import randomShipPlacement from '../../../utils/randomShipPlacement';

import { RootStore } from '../../../store/store';

import FieldRow from '../../FieldRow/FieldRow';
import computerShot from '../../../utils/computerShot';
import addShip from '../../../utils/customShipPlacement';
import useActions from '../../../hooks/useActions';

interface BuildSquareProps {
    playerAffiliation: IOwner;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation: { owner } }: BuildSquareProps) => {
    const { renderFriendlySquare, renderEnemySquare } = useActions();
    const {
        squares: { userSquare, computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { gameStatus } = useSelector(({ gameReducer }: RootStore) => gameReducer);

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
            renderFriendlySquare(currentSquare);
        } else {
            renderEnemySquare(randomShipPlacement(currentSquare));
        }
    }, []);

    const userBuildRandomShipsHandler = () => {
        currentSquare = createSquare();
        renderFriendlySquare(randomShipPlacement(currentSquare));
    };

    useEffect(() => {
        if (gameStatus) {
            userBuildRandomShipsHandler();
        }
    }, [gameStatus]);

    const enemyHitHandler = () => {
        const [array, again] = computerShot(userSquare);
        currentSquare = array;
        renderFriendlySquare(currentSquare);

        if (again) {
            setTimeout(() => {
                enemyHitHandler();
            }, 300);
        }
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        if (owner === User) {
            renderFriendlySquare(addShip(currentSquare, id));
        } else {
            currentSquare = updateCell(computerSquare, id);
            renderEnemySquare(currentSquare);

            const [{ past }] = computerSquare.flat().filter(cell => cell.id === id);
            if (past) {
                enemyHitHandler();
            }
        }
    };

    return (
        <>
            {currentSquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} owner={owner} />
            ))}
            <button type="button" onClick={userBuildRandomShipsHandler}>
                RRRRRR
            </button>
        </>
    );
};

export default BuildSquare;
