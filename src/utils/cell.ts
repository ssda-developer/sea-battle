import { ICell } from '../interface';
import { CellDirection } from '../enums';
import { getRandomValue, iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';

/**
 * Get cells around the current cell.
 *
 * @param field
 * @param i
 * @param j
 * @param direction
 */
export const getCellsAround = (field: ICell[][], i: number, j: number, direction?: CellDirection): (ICell | null)[] => {
    const { Diagonal } = CellDirection;
    const { length } = field;
    const [numberUp, letterRight, numberDown, letterLeft] = [i - 1, j + 1, i + 1, j - 1];

    const cellsDiagonal = [
        numberUp >= 0 && letterLeft >= 0 ? field[numberUp][letterLeft] : null,
        numberUp >= 0 && letterRight < length ? field[numberUp][letterRight] : null,
        numberDown < length && letterLeft >= 0 ? field[numberDown][letterLeft] : null,
        numberDown < length && letterRight < length ? field[numberDown][letterRight] : null,
    ];

    const cellsNonDiagonal = [
        numberUp >= 0 ? field[numberUp][j] : null,
        letterRight < length ? field[i][letterRight] : null,
        numberDown < length ? field[numberDown][j] : null,
        letterLeft >= 0 ? field[i][letterLeft] : null,
    ];

    const cellsDirection = direction === Diagonal ? cellsDiagonal : cellsNonDiagonal;

    return direction ? cellsDirection : [...cellsDiagonal, ...cellsNonDiagonal];
};

/**
 * Get cell by ID.
 *
 * @param field
 * @param cellId
 */
export const getCellById = (field: ICell[][], cellId: string): ICell | null => {
    let cell: ICell | null = null;

    iteratingTwoDimensionalArray(field, (i, j) => {
        const currentCell = field[i][j];

        if (currentCell.id === cellId) {
            cell = currentCell;
        }
    });

    return cell;
};

/**
 * Get cell coordinates by ID.
 *
 * @param field
 * @param cellId
 */
export const getCellCoordsById = (field: ICell[][], cellId: string): number[] => {
    let coords: number[] = [];

    iteratingTwoDimensionalArray(field, (i, j) => {
        const cell = field[i][j];

        if (cell.id === cellId) {
            coords = [i, j];
        }
    });

    return coords;
};

/**
 * Get random empty cell.
 *
 * @param field
 */
export const getRandomEmptyCell = (field: ICell[][]): ICell => {
    const { length } = field;
    const coordX = getRandomValue(length);
    const coordY = getRandomValue(length);
    const cell = field[coordX][coordY];

    return !cell.hit && !cell.miss ? cell : getRandomEmptyCell(field);
};

/**
 * Lock cell.
 *
 * @param cell
 * @param currentShipId
 */
export const lockCell = (cell: ICell | null, currentShipId: string): void => {
    if (cell && !cell.ship) {
        cell.lock = true;
        cell.lockId = cell.lockId.length === 0 ? `lock-${currentShipId}` : cell.lockId;
    }
};

/**
 * Lock all empty cells.
 *
 * @param field
 */
export const lockAllEmptyCells = (field: ICell[][]): void => {
    iteratingFlatArray(field, cell => {
        if (!cell.ship) {
            cell.lock = true;
        }
    });
};
