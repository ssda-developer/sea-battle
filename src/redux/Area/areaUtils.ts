import { IField } from '../Field/fieldInterfaces';
import getUniqId from '../../helpers';

export const updateCell = (square: Array<Array<IField>>, currentCellId: string): Array<Array<IField>> => {
    const { length } = square;

    for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
            const cell = square[i][j];

            if (cell.id === currentCellId) {
                if (cell.ship) {
                    cell.hit = true;
                } else {
                    cell.past = true;
                }
            }
        }
    }

    return square;
};

const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let isStartClickBuildShip = true;
let uniqShipId = getUniqId();
let currentShipLength = 0;

const resetStartingValues = () => {
    isStartClickBuildShip = true;
    uniqShipId = getUniqId();
    currentShipLength = 0;
};

const getCellsAround = (square: Array<Array<IField>>, i: number, j: number, direction: 'diagonal' | 'non-diagonal') => {
    const { length } = square;
    const [shiftUp, shiftRight, shiftDown, shiftLeft] = [i - 1, j + 1, i + 1, j - 1];

    if (direction === 'diagonal') {
        return [
            shiftUp >= 0 && shiftLeft >= 0 ? square[shiftUp][shiftLeft] : null,
            shiftUp >= 0 && shiftRight < length ? square[shiftUp][shiftRight] : null,
            shiftDown < length && shiftLeft >= 0 ? square[shiftDown][shiftLeft] : null,
            shiftDown < length && shiftRight < length ? square[shiftDown][shiftRight] : null,
        ];
    }

    if (direction === 'non-diagonal') {
        return [
            shiftUp >= 0 ? square[shiftUp][j] : null,
            shiftRight < length ? square[i][shiftRight] : null,
            shiftDown < length ? square[shiftDown][j] : null,
            shiftLeft >= 0 ? square[i][shiftLeft] : null,
        ];
    }

    return [];
};

const lockedCell = (cell: IField | null) => {
    if (cell && !cell.ship) {
        cell.locked = true;
        cell.lockedId = cell.lockedId.length === 0 ? `locked-${uniqShipId}` : cell.lockedId;
    }
};

const finishBuildingShip = (square: Array<Array<IField>>, currentShipId: string): Array<Array<IField>> => {
    const { length } = square;

    for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
            const cell = square[i][j];

            if (cell.shipId === currentShipId) {
                getCellsAround(square, i, j, 'non-diagonal').forEach(nonDiagonalCell => lockedCell(nonDiagonalCell));
            }
        }
    }

    resetStartingValues();

    return square;
};

const removeWrongShip = (square: Array<Array<IField>>, currentShipId: string): Array<Array<IField>> => {
    square.flat().forEach(cell => {
        if (cell.shipId === currentShipId || cell.lockedId === `locked-${currentShipId}`) {
            cell.ship = false;
            cell.shipId = '';
            cell.locked = false;
            cell.lockedId = '';
        }
    });

    resetStartingValues();

    return square;
};

export const addShip = (square: Array<Array<IField>>, currentCellId: string): Array<Array<IField>> => {
    let array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];

            if (cell.id === currentCellId) {
                const [cellUp, cellRight, cellDown, cellLeft] = getCellsAround(array, i, j, 'non-diagonal');

                if (
                    (cellUp && cellUp.shipId === uniqShipId) ||
                    (cellRight && cellRight.shipId === uniqShipId) ||
                    (cellDown && cellDown.shipId === uniqShipId) ||
                    (cellLeft && cellLeft.shipId === uniqShipId) ||
                    isStartClickBuildShip
                ) {
                    const maxShipLength = Math.max(...ships);
                    currentShipLength += 1;

                    getCellsAround(array, i, j, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));

                    cell.ship = true;
                    cell.shipId = uniqShipId;
                    isStartClickBuildShip = false;

                    if (currentShipLength === maxShipLength) {
                        ships.splice(ships.indexOf(currentShipLength), 1);
                        array = finishBuildingShip(array, uniqShipId);
                    }
                } else {
                    const index = ships.indexOf(currentShipLength);
                    if (index >= 0) {
                        ships.splice(index, 1);
                        array = finishBuildingShip(array, uniqShipId);
                    } else {
                        removeWrongShip(array, uniqShipId);
                    }

                    addShip(square, currentCellId);
                }
            }
        }
    }

    if (ships.length === 0) {
        array.flat().forEach(cell => {
            if (!cell.ship) {
                cell.locked = true;
            }
        });
    }

    return array;
};
