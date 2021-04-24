import { IField } from '../store/field/interfaces';
import { iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { CellDirection } from '../constants/shipsConstants';
import { AREA_LETTERS, AREA_NUMBERS } from '../constants/areaConstants';

/**
 * Create a  two-dimensional array with empty cells.
 */
export const createSquare = (): IField[][] => {
    const square: IField[][] = [];

    AREA_NUMBERS.forEach(number => {
        const row: IField[] = [];

        AREA_LETTERS.forEach(letter => {
            const cell = {
                id: `${letter}${number}`,
                ship: false,
                shipId: '',
                hit: false,
                past: false,
                locked: false,
                explode: false,
                lockedId: '',
            };

            row.push(cell);
        });

        square.push(row);
    });

    return square;
};

/**
 * Get a cell by ID.
 * @param square
 * @param id
 */
export const getCellById = (square: IField[][], id: string): IField | null => {
    let cell: IField | null = null;

    iteratingTwoDimensionalArray(square, (i, j) => {
        const currentCell = square[i][j];

        if (currentCell.id === id) {
            cell = currentCell;
        }
    });

    return cell;
};

/**
 * Get the position of a cell by ID.
 * @param square
 * @param id
 */
export const getPositionCellById = (square: IField[][], id: string): number[] => {
    let position: number[] = [];

    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = square[i][j];

        if (cell.id === id) {
            position = [i, j];
        }
    });

    return position;
};

/**
 * Blowing up the ship.
 * @param array
 * @param currentShipId
 */
const shipExplosion = (array: IField[][], currentShipId: string) => {
    let shipField = 0;
    let shipHit = 0;

    iteratingFlatArray(array, cell => {
        if (cell.shipId === currentShipId) {
            shipField += 1;
            if (cell.hit) {
                shipHit += 1;
            }
        }
    });

    if (shipField === shipHit) {
        iteratingFlatArray(array, cell => {
            if (cell.shipId === currentShipId) {
                cell.explode = true;
            }
        });
    }

    return array;
};

/**
 * Update cell.
 * @param array
 * @param currentCellId
 */
export const updateCell = (array: IField[][], currentCellId: string): IField[][] => {
    const arrayCell = getCellById(array, currentCellId) as IField;

    if (arrayCell.ship) {
        arrayCell.hit = true;
        array = shipExplosion(array, arrayCell.shipId);
    } else {
        arrayCell.past = true;
    }

    return array;
};

/**
 * Get the cells around the current cell.
 * @param square
 * @param i
 * @param j
 * @param direction
 */
export const getCellsAround = (square: IField[][], i: number, j: number, direction: CellDirection): (IField | null)[] => {
    const { Diagonal, NonDiagonal } = CellDirection;
    const { length } = square;
    const [numberUp, letterRight, numberDown, letterLeft] = [i - 1, j + 1, i + 1, j - 1];

    if (direction === Diagonal) {
        return [
            numberUp >= 0 && letterLeft >= 0 ? square[numberUp][letterLeft] : null,
            numberUp >= 0 && letterRight < length ? square[numberUp][letterRight] : null,
            numberDown < length && letterLeft >= 0 ? square[numberDown][letterLeft] : null,
            numberDown < length && letterRight < length ? square[numberDown][letterRight] : null,
        ];
    }

    if (direction === NonDiagonal) {
        return [
            numberUp >= 0 ? square[numberUp][j] : null,
            letterRight < length ? square[i][letterRight] : null,
            numberDown < length ? square[numberDown][j] : null,
            letterLeft >= 0 ? square[i][letterLeft] : null,
        ];
    }

    return [];
};

/**
 * Lock all empty cells.
 * @param array
 */
export const lockAllEmptyCell = (array: IField[][]): void => {
    iteratingFlatArray(array, cell => {
        if (!cell.ship) {
            cell.locked = true;
        }
    });
};

/**
 * Unlock all empty cells.
 * @param array
 */
export const unlockAllEmptyCell = (array: IField[][]): void => {
    iteratingFlatArray(array, cell => {
        if (!cell.ship) {
            cell.locked = false;
        }
    });
};

/**
 * Check for non-destroyed ships on the field.
 * @param array
 */
export const checkFinishGame = (array: IField[][]) => {
    return !array.flat().filter(cell => cell.ship && !cell.explode).length;
};
