import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { ICell } from '../../interface';
import { Owners } from '../../enums';

import './Cell.scss';
import { startCreateShip } from '../../utils/customCreateShip';
import { checkRemainingShips, checkFinishGame, updateCell } from '../../utils/areaUtils';
import randomComputerShot from '../../utils/randomComputerShot';
import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';
import { SHIPS } from '../../constants';

const Cell: FC<ICell> = ({ id, ship, hit, miss, locked, explode, owner }: ICell) => {
    const {
        renderUserSquare,
        renderComputerSquare,
        changeCurrentPlayer,
        changeGameStart,
        changeUserShips,
        changeComputerShips,
        changeUserSquareComplete,
        changeGameOver,
    } = useActions();

    const {
        user: { userSquare },
        computer: { computerSquare },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { User, Computer } = Owners;
    let currentSquare = owner === User ? userSquare : computerSquare;
    const disabled = owner === User ? hit || ship || miss || locked : hit || miss || explode;

    const className =
        owner === User
            ? `cell${hit ? ' hit' : ''}${miss ? ' miss' : ''}${ship ? ' ship' : ''}${locked ? ' locked' : ''}${explode ? ' explode' : ''}`
            : `cell${hit ? ' hit' : ''}${miss ? ' miss' : ''}${explode ? ' explode' : ''}`;

    const manageStatusGame = (square: ICell[][]): void => {
        if (checkFinishGame(square)) {
            changeGameStart(false);
            changeGameOver(true);
        }
    };

    const updateComputerCell = () => {
        const [array, again] = randomComputerShot(userSquare);
        currentSquare = array;
        renderUserSquare(currentSquare);
        changeUserShips(checkRemainingShips(userSquare, false));
        manageStatusGame(currentSquare);

        if (again) {
            setTimeout(() => {
                updateComputerCell();
            }, 700);
        } else if (!checkFinishGame(array)) {
            changeCurrentPlayer(User);
        }
    };

    const updateUserCell = () => {
        const square = startCreateShip(userSquare, id);
        renderUserSquare(square);
        changeUserShips(checkRemainingShips(userSquare, false));
        changeUserSquareComplete(checkRemainingShips(square).length === SHIPS.length);
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        if (owner === User) {
            updateUserCell();
        } else {
            currentSquare = updateCell(computerSquare, id);
            renderComputerSquare(currentSquare);
            manageStatusGame(currentSquare);

            const [{ miss: currentMiss, explode: currentExplode }] = computerSquare.flat().filter(cell => cell.id === id);
            if (currentMiss) {
                changeCurrentPlayer(Computer);
                setTimeout(() => {
                    updateComputerCell();
                }, 700);
            }
            if (currentExplode) {
                changeComputerShips(checkRemainingShips(computerSquare, false));
            }
        }
    };

    return <button type="button" id={id} className={className} onClick={updateCellHandler} aria-label={id} disabled={disabled} />;
};

export default Cell;
