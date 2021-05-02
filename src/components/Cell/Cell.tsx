import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootStore } from '../../store';

import { SHIPS } from '../../constants';
import { Owners } from '../../enums';
import { getClassNames } from '../../helpers';
import useActions from '../../hooks';
import { ICell } from '../../interface';

import { startCreateShip } from '../../utils/customCreateShip';
import randomComputerShot from '../../utils/randomComputerShot';

import './Cell.scss';
import { isFinishGame } from '../../utils/field';
import { getAllShips, getNonExplodeShips, checkShot } from '../../utils/ship';

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

    const updateUserCellOnCreate = (): void => {
        const field = startCreateShip(userField, id);

        renderUserField(field);
        changeUserShips(getNonExplodeShips(userField));
        changeUserFieldComplete(getAllShips(field).length === SHIPS.length);
    };

    const updateUserCellOnShot = (): void => {
        setTimeout(() => {
            const [field, isAgain] = randomComputerShot(userField);
            currentField = field;

            renderUserField(currentField);
            changeUserShips(getNonExplodeShips(userField));
            manageGameStatus(currentField);

            if (isAgain) {
                updateUserCellOnShot();
            } else {
                changeCurrentPlayer(User);
            }
        }, 700);
    };

    const updateComputerCellOnShot = (): void => {
        currentField = checkShot(computerField, id);

        renderComputerField(currentField);
        manageGameStatus(currentField);

        const [{ miss: userClickMiss, explode: userClickExplode }] = computerField.flat().filter(cell => cell.id === id);

        if (userClickMiss) {
            changeCurrentPlayer(Computer);
            updateUserCellOnShot();
        }

        if (userClickExplode) {
            changeComputerShips(getNonExplodeShips(computerField));
        }
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>): void => {
        evn.preventDefault();

        if (isUser) {
            updateUserCellOnCreate();
        } else {
            updateComputerCellOnShot();
        }
    };

    return (
        <button type="button" id={id} className={`cell ${className}`} onClick={updateCellHandler} aria-label={id} disabled={isDisabled} />
    );
};

export default Cell;
