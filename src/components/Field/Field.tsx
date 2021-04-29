import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../store/field/interfaces';
import { Owners } from '../../store/area/interfaces';

import './Field.scss';
import { addPartShip } from '../../utils/customShipPlacement';
import { checkRemainingShips, checkFinishGame, updateCell } from '../../utils/areaUtils';
import computerShot from '../../utils/computerShot';
import useActions from '../../hooks/useActions';
import { RootStore } from '../../store/store';
import { SHIPS } from '../../constants/shipsConstants';

const Field: FC<IField> = ({ id, ship, hit, past, locked, explode, owner }: IField) => {
    const {
        RenderUserSquare,
        RenderComputerSquare,
        ChangeCurrentPlayer,
        ChangeGameStart,
        ChangeUserShips,
        ChangeComputerShips,
        ChangeUserSquareComplete,
        ChangeGameOver,
    } = useActions();

    const {
        user: { userSquare },
        computer: { computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { User, Computer } = Owners;
    let currentSquare = owner === User ? userSquare : computerSquare;
    const disabled = owner === User ? hit || ship || past || locked : hit || past || explode;

    const className =
        owner === User
            ? `field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `field${hit ? ' hit' : ''}${past ? ' past' : ''}${explode ? ' explode' : ''}`;

    const manageStatusGame = (square: IField[][]): void => {
        if (checkFinishGame(square)) {
            ChangeGameStart(false);
            ChangeGameOver(true);
        }
    };

    const enemyHitHandler = () => {
        const [array, again] = computerShot(userSquare);
        currentSquare = array;
        RenderUserSquare(currentSquare);
        ChangeUserShips(checkRemainingShips(userSquare, false));
        manageStatusGame(currentSquare);

        if (again) {
            setTimeout(() => {
                enemyHitHandler();
            }, 700);
        } else {
            ChangeCurrentPlayer(User);
        }
    };

    const updateFieldHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id: currentId },
        } = evn;

        if (owner === User) {
            const square = addPartShip(userSquare, currentId);
            RenderUserSquare(square);
            ChangeUserSquareComplete(checkRemainingShips(square).length === SHIPS.length);
        } else {
            currentSquare = updateCell(computerSquare, currentId);
            RenderComputerSquare(currentSquare);
            manageStatusGame(currentSquare);

            const [{ past: currentPast, explode: currentExplode, shipId: currentShipId }] = computerSquare
                .flat()
                .filter(cell => cell.id === currentId);
            if (currentPast) {
                ChangeCurrentPlayer(Computer);
                setTimeout(() => {
                    enemyHitHandler();
                }, 700);
            }
            if (currentExplode) {
                ChangeComputerShips(checkRemainingShips(computerSquare, false));
            }
        }
    };

    return <button type="button" id={id} className={className} onClick={updateFieldHandler} aria-label={id} disabled={disabled} />;
};

export default Field;
