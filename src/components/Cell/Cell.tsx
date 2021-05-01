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
    let currentField = owner === User ? userField : computerField;
    const disabled = owner === User ? hit || ship || miss || lock : hit || miss || explode;

    const className =
        owner === User
            ? `cell${hit ? ' hit' : ''}${miss ? ' miss' : ''}${ship ? ' ship' : ''}${lock ? ' lock' : ''}${explode ? ' explode' : ''}`
            : `cell${hit ? ' hit' : ''}${miss ? ' miss' : ''}${explode ? ' explode' : ''}`;

    const manageStatusGame = (field: ICell[][]): void => {
        if (isFinishGame(field)) {
            changeGameStart(false);
            changeGameOver(true);
        }
    };

    const updateComputerCell = () => {
        const [array, again] = randomComputerShot(userField);
        currentField = array;
        renderUserField(currentField);
        changeUserShips(getNonExplodeShips(userField));
        manageStatusGame(currentField);

        if (again) {
            setTimeout(() => {
                updateComputerCell();
            }, 700);
        } else if (!isFinishGame(array)) {
            changeCurrentPlayer(User);
        }
    };

    const updateUserCell = () => {
        const field = startCreateShip(userField, id);
        renderUserField(field);
        changeUserShips(getNonExplodeShips(userField));
        changeUserFieldComplete(getAllShips(field).length === SHIPS.length);
    };

    const updateCellHandler = (evn: MouseEvent<HTMLButtonElement>) => {
        evn.preventDefault();

        if (owner === User) {
            updateUserCell();
        } else {
            currentField = checkShotByCell(computerField, id);
            renderComputerField(currentField);
            manageStatusGame(currentField);

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

    return <button type="button" id={id} className={className} onClick={updateCellHandler} aria-label={id} disabled={disabled} />;
};

export default Cell;
