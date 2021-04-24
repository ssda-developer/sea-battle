import { CellDirection, SHIPS } from '../constants/shipsConstants';
import { getUniqId, iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { IField } from '../store/field/interfaces';
import { getCellsAround, lockAllEmptyCell } from './areaUtils';

let ships = [...SHIPS];
let isStartBuildShip = true;
let uniqShipId = getUniqId();
let currentShipLength = 0;

/**
 * Return the variables to their initial values.
 */
const resetStartingValues = () => {
    isStartBuildShip = true;
    uniqShipId = getUniqId();
    currentShipLength = 0;
};

/**
 * Lock cell.
 * @param cell
 */
export const lockCell = (cell: IField | null): void => {
    if (cell && !cell.ship) {
        cell.locked = true;
        cell.lockedId = cell.lockedId.length === 0 ? `locked-${uniqShipId}` : cell.lockedId;
    }
};

/**
 * Finishing the construction of the ship.
 * @param square
 * @param currentShipId
 */
export const finishBuildingShip = (square: IField[][], currentShipId: string): IField[][] => {
    const { NonDiagonal } = CellDirection;
    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = square[i][j];

        if (cell.shipId === currentShipId) {
            getCellsAround(square, i, j, NonDiagonal).forEach(nonDiagonalCell => lockCell(nonDiagonalCell));
        }
    });
    resetStartingValues();

    return square;
};

/**
 * Removing unfinished / wrong ship.
 * @param array
 * @param currentShipId
 */
const removeWrongShip = (array: IField[][], currentShipId: string): IField[][] => {
    iteratingFlatArray(array, cell => {
        if (cell.shipId === currentShipId || cell.lockedId === `locked-${currentShipId}`) {
            cell.ship = false;
            cell.shipId = '';
            cell.locked = false;
            cell.lockedId = '';
        }
    });
    resetStartingValues();

    return array;
};

/**
 * Add a part of the ship.
 * @param square
 * @param currentCellId
 */
const addPartShip = (square: IField[][], currentCellId: string): IField[][] => {
    const { Diagonal, NonDiagonal } = CellDirection;
    let array = square;

    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = array[i][j];

        if (cell.id === currentCellId) {
            const [cellUp, cellRight, cellDown, cellLeft] = getCellsAround(array, i, j, NonDiagonal);

            if (
                cellUp?.shipId === uniqShipId ||
                cellRight?.shipId === uniqShipId ||
                cellDown?.shipId === uniqShipId ||
                cellLeft?.shipId === uniqShipId ||
                isStartBuildShip
            ) {
                const maxShipLength = Math.max(...ships);
                currentShipLength += 1;

                getCellsAround(array, i, j, Diagonal).forEach(diagonalCell => lockCell(diagonalCell));

                cell.ship = true;
                cell.shipId = uniqShipId;
                isStartBuildShip = false;

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

                addPartShip(square, currentCellId);
            }
        }
    });

    if (!ships.length) {
        lockAllEmptyCell(array);
        resetStartingValues();
        ships = [...SHIPS];
    }

    return array;
};

export default addPartShip;
