import { AREA_LETTERS, AREA_NUMBERS } from '../constants';
import { CellDirection } from '../enums';
import { iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { ICell } from '../interface';

/**
 * Create a  two-dimensional array with empty cells.
 */
export const createField = (): ICell[][] => {
    const field: ICell[][] = [];

    AREA_NUMBERS.forEach(number => {
        const row: ICell[] = [];

        AREA_LETTERS.forEach(letter => {
            const cell = {
                id: `${letter}${number}`,
                ship: false,
                shipId: '',
                hit: false,
                miss: false,
                locked: false,
                explode: false,
                lockedId: '',
            };

            row.push(cell);
        });

        field.push(row);
    });

    return field;
};

/**
 * Get the cells around the current cell.
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

    const cellNonDiagonal = [
        numberUp >= 0 ? field[numberUp][j] : null,
        letterRight < length ? field[i][letterRight] : null,
        numberDown < length ? field[numberDown][j] : null,
        letterLeft >= 0 ? field[i][letterLeft] : null,
    ];

    const cellsDirection = direction === Diagonal ? cellsDiagonal : cellNonDiagonal;

    return direction ? cellsDirection : [...cellsDiagonal, ...cellNonDiagonal];
};

/**
 * Get a cell by ID.
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
 * Get the position of a cell by ID.
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
 * Blowing up the ship.
 * @param field
 * @param currentShipId
 */
const explodeShip = (field: ICell[][], currentShipId: string) => {
    const lengthShip = field.flat().filter(cell => cell.shipId === currentShipId);
    const countHitsShip = lengthShip.filter(cell => cell.hit);

    const setMissCells = (cell: ICell) => {
        const [coordX, coordY] = getCellCoordsById(field, cell.id);

        getCellsAround(field, coordX, coordY).forEach(currentCell => {
            if (currentCell && !currentCell.ship) {
                currentCell.miss = true;
            }
        });
    };

    if (lengthShip.length === countHitsShip.length) {
        iteratingFlatArray(field, cell => {
            if (cell.shipId === currentShipId) {
                cell.explode = true;

                setMissCells(cell);
            }
        });
    }

    return field;
};

/**
 * Update cell.
 * @param field
 * @param currentCellId
 */
export const checkShotByCell = (field: ICell[][], currentCellId: string): ICell[][] => {
    const cell = getCellById(field, currentCellId) as ICell;

    if (cell.ship) {
        cell.hit = true;
        field = explodeShip(field, cell.shipId);
    } else {
        cell.miss = true;
    }

    return field;
};

/**
 * Lock cell.
 * @param cell
 * @param currentShipId
 */
export const lockCell = (cell: ICell | null, currentShipId: string): void => {
    if (cell && !cell.ship) {
        cell.locked = true;
        cell.lockedId = cell.lockedId.length === 0 ? `locked-${currentShipId}` : cell.lockedId;
    }
};

/**
 * Lock all empty cells.
 * @param array
 */
export const lockAllEmptyCells = (array: ICell[][]): void => {
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
export const unlockAllEmptyCells = (array: ICell[][]): void => {
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
export const checkFinishGame = (array: ICell[][]): boolean => {
    return !array.flat().filter(cell => cell.ship && !cell.explode).length;
};

/**
 * Returns an array of remaining ships.
 * @param array
 * @param life
 */
export const checkRemainingShips = (array: ICell[][], life = true): number[] => {
    const arrayShips: string[] = [];

    iteratingFlatArray(array, ({ shipId, explode }: ICell) => {
        if (shipId) {
            if (life) {
                arrayShips.push(shipId);
            } else if (!explode) {
                arrayShips.push(shipId);
            }
        }
    });

    const temp = arrayShips.reduce((acc: Record<string, number>, el: string) => {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
    }, {});

    return Object.values(temp).sort((a: number, b: number) => temp[b] - temp[a]);
};
