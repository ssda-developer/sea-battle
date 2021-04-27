import React, { FC, MouseEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IField } from '../../../store/field/interfaces';
import { Owners } from '../../../store/area/interfaces';

import { checkFinishGame, createSquare, updateCell } from '../../../utils/areaUtils';
import randomShipPlacement from '../../../utils/randomShipPlacement';

import { RootStore } from '../../../store/store';

import FieldRow from '../../FieldRow/FieldRow';
import computerShot from '../../../utils/computerShot';
import addShip from '../../../utils/customShipPlacement';
import useActions from '../../../hooks/useActions';

interface BuildSquareProps {
    playerAffiliation: Owners;
}

const BuildSquare: FC<BuildSquareProps> = ({ playerAffiliation }: BuildSquareProps) => {
    const {
        RenderUserSquare,
        RenderComputerSquare,
        ChangeCurrentPlayer,
        ChangeGameStart,
        ChangeUserShips,
        ChangeComputerShips,
    } = useActions();
    const {
        user: { userSquare, userShips },
        computer: { computerSquare, computerShips },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);
    const { User, Computer } = Owners;
    let currentSquare = playerAffiliation === User ? userSquare : computerSquare;

    useEffect(() => {
        currentSquare = createSquare();

        if (playerAffiliation === User) {
            RenderUserSquare(currentSquare);
        } else {
            RenderComputerSquare(randomShipPlacement(currentSquare));
        }
    }, []);

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

    const changeShipsArray = (ships: number[], count: number): number[] => {
        const index = ships.indexOf(count);
        if (index >= 0) {
            ships.splice(index, 1);
        }
        return ships;
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        const {
            currentTarget: { id },
        } = evn;

        if (playerAffiliation === User) {
            RenderUserSquare(addShip(currentSquare, id));
        } else {
            currentSquare = updateCell(computerSquare, id);
            RenderComputerSquare(currentSquare);
            ChangeGameStart(!checkFinishGame(currentSquare));

            const [{ past, explode, shipId }] = computerSquare.flat().filter(cell => cell.id === id);
            if (past) {
                ChangeCurrentPlayer(Computer);
                setTimeout(() => {
                    enemyHitHandler();
                }, 500);
            }
            if (explode) {
                ChangeComputerShips(changeShipsArray(computerShips, computerSquare.flat().filter(cell => cell.shipId === shipId).length));
            }
        }
    };

    return (
        <>
            {currentSquare.map((row: IField[], idx: number) => (
                <FieldRow key={row[idx].id} row={row} updateCellHandler={updateCellHandler} owner={playerAffiliation} />
            ))}
        </>
    );
};

export default BuildSquare;
