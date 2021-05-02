import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { ICell } from '../../interface';
import { Owners } from '../../enums';

import './Cell.scss';
import { startCreateShip } from '../../utils/customCreateShip';
import { getAllShips, getNonExplodeShips, isFinishGame, checkShotByCell } from '../../utils/areaUtils';
import randomComputerShot from '../../utils/randomComputerShot';
import useActions from '../../hooks/useActions';
import { RootStore } from '../../store';
import { SHIPS } from '../../constants';
import { getClassNames } from '../../helpers';

const Cell: FC<ICell> = ({ id, ship, hit, miss, lock, explode, owner }: ICell) => {
    const {
        renderUserField,
        renderComputerField,
        changeCurrentPlayer,
        changeGameStart,
        changeUserShips,
        changeComputerShips,
        changeUserFieldComplete,
        changeGameOver,
    } = useActions();

    const {
        user: { userField },
        computer: { computerField },
    } = useSelector(({ areaReducer }: RootStore) => areaReducer);

    const { User, Computer } = Owners;
    const isUser = owner === User;
    const isDisabled = isUser ? hit || ship || miss || lock : hit || miss || explode;
    const className = isUser ? getClassNames({ hit, miss, ship, lock, explode }) : getClassNames({ hit, miss, explode });
    let currentField = isUser ? userField : computerField;

    const manageGameStatus = (field: ICell[][]): void => {
        if (isFinishGame(field)) {
            changeGameStart(false);
            changeGameOver(true);
        }
    };

    const updateComputerCell = (): void => {
        const [field, isAgain] = randomComputerShot(userField);
        currentField = field;
        renderUserField(currentField);
        changeUserShips(getNonExplodeShips(userField));
        manageGameStatus(currentField);

        if (isAgain) {
            setTimeout(() => {
                updateComputerCell();
            }, 700);
        } else if (!isFinishGame(field)) {
            changeCurrentPlayer(User);
        }
    };

    const updateUserCell = (): void => {
        const field = startCreateShip(userField, id);
        renderUserField(field);
        changeUserShips(getNonExplodeShips(userField));
        changeUserFieldComplete(getAllShips(field).length === SHIPS.length);
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>): void => {
        evn.preventDefault();

        if (isUser) {
            updateUserCell();
        } else {
            currentField = checkShotByCell(computerField, id);
            renderComputerField(currentField);
            manageGameStatus(currentField);

            const [{ miss: currentMiss, explode: currentExplode }] = computerField.flat().filter(cell => cell.id === id);
            if (currentMiss) {
                changeCurrentPlayer(Computer);
                setTimeout(() => {
                    updateComputerCell();
                }, 700);
            }
            if (currentExplode) {
                changeComputerShips(getNonExplodeShips(computerField));
            }
        }
    };

    return (
        <button type="button" id={id} className={`cell ${className}`} onClick={updateCellHandler} aria-label={id} disabled={isDisabled} />
    );
};

export default Cell;
