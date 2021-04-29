import { SHIPS } from '../constants';
import { CellDirection } from '../enums';
import { getUniqId, iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { ICell } from '../interface';
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

export const resetShipsValues = (): void => {
    ships = [...SHIPS];
};

/**
 * Lock cell.
 * @param cell
 */
export const lockCell = (cell: ICell | null): void => {
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
export const finishBuildingShip = (square: ICell[][], currentShipId: string): ICell[][] => {
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
const removeWrongShip = (array: ICell[][], currentShipId: string): ICell[][] => {
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
export const addPartShip = (square: ICell[][], currentCellId: string): ICell[][] => {
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
        resetShipsValues();
    }

    return array;
};
