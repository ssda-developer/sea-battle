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
export const getCellsAround = (field: ICell[][], i: number, j: number, direction: CellDirection): (ICell | null)[] => {
    const { Diagonal, NonDiagonal } = CellDirection;
    const { length } = field;
    const [numberUp, letterRight, numberDown, letterLeft] = [i - 1, j + 1, i + 1, j - 1];

    if (direction === Diagonal) {
        return [
            numberUp >= 0 && letterLeft >= 0 ? field[numberUp][letterLeft] : null,
            numberUp >= 0 && letterRight < length ? field[numberUp][letterRight] : null,
            numberDown < length && letterLeft >= 0 ? field[numberDown][letterLeft] : null,
            numberDown < length && letterRight < length ? field[numberDown][letterRight] : null,
        ];
    }

    if (direction === NonDiagonal) {
        return [
            numberUp >= 0 ? field[numberUp][j] : null,
            letterRight < length ? field[i][letterRight] : null,
            numberDown < length ? field[numberDown][j] : null,
            letterLeft >= 0 ? field[i][letterLeft] : null,
        ];
    }

    return [];
};

/**
 * Get a cell by ID.
 * @param field
 * @param id
 */
export const getCellById = (field: ICell[][], id: string): ICell | null => {
    let cell: ICell | null = null;

    iteratingTwoDimensionalArray(field, (i, j) => {
        const currentCell = field[i][j];

        if (currentCell.id === id) {
            cell = currentCell;
        }
    });

    return cell;
};

/**
 * Get the position of a cell by ID.
 * @param field
 * @param id
 */
export const getPositionCellById = (field: ICell[][], id: string): number[] => {
    let position: number[] = [];

    iteratingTwoDimensionalArray(field, (i, j) => {
        const cell = field[i][j];

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
const shipExplosion = (array: ICell[][], currentShipId: string) => {
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

                const [i, j] = getPositionCellById(array, cell.id) as number[];
                const { Diagonal, NonDiagonal } = CellDirection;

                [...getCellsAround(array, i, j, NonDiagonal), ...getCellsAround(array, i, j, Diagonal)].forEach(nonDiagonalCell => {
                    if (nonDiagonalCell && !nonDiagonalCell.ship) {
                        nonDiagonalCell.miss = true;
                    }
                });
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
export const updateCell = (array: ICell[][], currentCellId: string): ICell[][] => {
    const arrayCell = getCellById(array, currentCellId) as ICell;

    if (arrayCell.ship) {
        arrayCell.hit = true;
        array = shipExplosion(array, arrayCell.shipId);
    } else {
        arrayCell.miss = true;
    }

    return array;
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
