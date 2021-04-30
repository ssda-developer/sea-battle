import { SHIPS } from '../constants';
import { CellDirection } from '../enums';
import { getUniqId, iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { ICell } from '../interface';
import { getCellsAround, lockAllEmptyCells, lockCell } from './areaUtils';

let initialShips = [...SHIPS];
let initialShipId = getUniqId();
let initialShipLength = 0;
let isStartCreateShip = true;

/**
 * Reset the initial values.
 */
const resetInitialValues = () => {
    initialShipId = getUniqId();
    initialShipLength = 0;
    isStartCreateShip = true;
};

/**
 * Reset the initial ships values.
 */
export const resetInitialShipsValues = (): void => {
    initialShips = [...SHIPS];
};

/**
 * Finish creating one ship.
 *
 * @param field
 * @param currentShipId
 */
export const finishCreateShip = (field: ICell[][], currentShipId: string): ICell[][] => {
    const { NonDiagonal } = CellDirection;

    iteratingTwoDimensionalArray(field, (i, j) => {
        const cell = field[i][j];

        if (cell.shipId === currentShipId) {
            getCellsAround(field, i, j, NonDiagonal).forEach(nonDiagonalCell => lockCell(nonDiagonalCell, initialShipId));
        }
    });
    resetInitialValues();

    return field;
};

/**
 * Cancel creating one ship.
 *
 * @param field
 * @param currentShipId
 */
const cancelCreateShip = (field: ICell[][], currentShipId: string): ICell[][] => {
    iteratingFlatArray(field, cell => {
        if (cell.shipId === currentShipId || cell.lockedId === `locked-${currentShipId}`) {
            cell.ship = false;
            cell.shipId = '';
            cell.locked = false;
            cell.lockedId = '';
        }
    });
    resetInitialValues();

    return field;
};

/**
 * Manage creating one ship.
 *
 * @param currentField
 */
const manageCreateShip = (currentField: ICell[][]): ICell[][] => {
    let field = currentField;
    const index = initialShips.indexOf(initialShipLength);

    if (index >= 0) {
        initialShips.splice(index, 1);
        field = finishCreateShip(field, initialShipId);
    } else {
        cancelCreateShip(field, initialShipId);
    }

    return field;
};

/**
 * Start creating one ship.
 *
 * @param field
 * @param currentCellId
 */
export const startCreateShip = (field: ICell[][], currentCellId: string): ICell[][] => {
    const { Diagonal, NonDiagonal } = CellDirection;

    iteratingTwoDimensionalArray(field, (i, j) => {
        const cell = field[i][j];

        if (cell.id === currentCellId) {
            const [cellUp, cellRight, cellDown, cellLeft] = getCellsAround(field, i, j, NonDiagonal);

            if (
                cellUp?.shipId === initialShipId ||
                cellRight?.shipId === initialShipId ||
                cellDown?.shipId === initialShipId ||
                cellLeft?.shipId === initialShipId ||
                isStartCreateShip
            ) {
                const maxShipLength = Math.max(...initialShips);

                initialShipLength += 1;
                cell.ship = true;
                cell.shipId = initialShipId;
                isStartCreateShip = false;

                getCellsAround(field, i, j, Diagonal).forEach(diagonalCell => lockCell(diagonalCell, initialShipId));

                if (initialShipLength === maxShipLength) {
                    field = manageCreateShip(field);
                }
            } else {
                field = manageCreateShip(field);
                startCreateShip(field, currentCellId);
            }
        }
    });

    if (!initialShips.length) {
        lockAllEmptyCells(field);
        resetInitialValues();
        resetInitialShipsValues();
    }

    return field;
};
