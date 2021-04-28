import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../store/field/interfaces';
import { Owners } from '../../store/area/interfaces';

import './Field.scss';
import { addPartShip } from '../../utils/customShipPlacement';
import { checkArray, checkFinishGame, updateCell } from '../../utils/areaUtils';
import computerShot from '../../utils/computerShot';
import useActions from '../../hooks/useActions';
import { RootStore } from '../../store/store';

const Field: FC<IField> = ({ id, ship, hit, past, locked, explode, owner }: IField) => {
    const { RenderUserSquare, RenderComputerSquare, ChangeCurrentPlayer, ChangeGameStart, ChangeComputerShips } = useActions();
    const {
        user: { userSquare },
        computer: { computerSquare, computerShips },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { User, Computer } = Owners;
    let currentSquare = owner === User ? userSquare : computerSquare;
    const disabled = owner === User ? hit || ship || past || locked : hit || past || explode;

    const className =
        owner === User
            ? `field${hit ? ' hit' : ''}${past ? ' past' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `field${hit ? ' hit' : ''}${past ? ' past' : ''}${explode ? ' explode' : ''}`;

    const changeShipsArray = (ships: number[], count: number): number[] => {
        const index = ships.indexOf(count);
        if (index >= 0) {
            ships.splice(index, 1);
        }
        return ships;
    };

    const enemyHitHandler = () => {
        const [array, again] = computerShot(userSquare);
        currentSquare = array;
        RenderUserSquare(currentSquare);
        ChangeGameStart(!checkFinishGame(currentSquare));

        if (again) {
            setTimeout(() => {
                enemyHitHandler();
            }, 500);
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
            const qwe = addPartShip(userSquare, currentId);
            console.log(checkArray(qwe));
            RenderUserSquare(qwe);
        } else {
            currentSquare = updateCell(computerSquare, currentId);
            RenderComputerSquare(currentSquare);
            ChangeGameStart(!checkFinishGame(currentSquare));

            const [{ past: currentPast, explode: currentExplode, shipId: currentShipId }] = computerSquare
                .flat()
                .filter(cell => cell.id === currentId);
            if (currentPast) {
                ChangeCurrentPlayer(Computer);
                setTimeout(() => {
                    enemyHitHandler();
                }, 500);
            }
            if (currentExplode) {
                ChangeComputerShips(
                    changeShipsArray(computerShips, computerSquare.flat().filter(cell => cell.shipId === currentShipId).length),
                );
            }
        }
    };

    return <button type="button" id={id} className={className} onClick={updateFieldHandler} aria-label={id} disabled={disabled} />;
};

export default Field;
