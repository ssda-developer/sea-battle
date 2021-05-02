import { AREA_LETTERS, AREA_NUMBERS } from '../constants';
import { CellDirection } from '../enums';
import { getRandomValue, iteratingFlatArray, iteratingTwoDimensionalArray } from '../helpers';
import { ICell } from '../interface';

/**
 * Create field with empty cells.
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
                lock: false,
                explode: false,
                lockId: '',
            };

            row.push(cell);
        });

        field.push(row);
    });

    return field;
};

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
    ].filter(cell => cell);

    const cellsNonDiagonal = [
        numberUp >= 0 ? field[numberUp][j] : null,
        letterRight < length ? field[i][letterRight] : null,
        numberDown < length ? field[numberDown][j] : null,
        letterLeft >= 0 ? field[i][letterLeft] : null,
    ].filter(cell => cell);

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
 * Explode the ship.
 *
 * @param field
 * @param currentShipId
 */
const explodeShip = (field: ICell[][], currentShipId: string) => {
    const arrayShip = field.flat().filter(cell => cell.shipId === currentShipId);
    const countHitsShip = arrayShip.filter(cell => cell.hit).length;

    const setMissCells = (cell: ICell) => {
        const [coordX, coordY] = getCellCoordsById(field, cell.id);

        getCellsAround(field, coordX, coordY).forEach(currentCell => {
            if (currentCell && !currentCell.ship) {
                currentCell.miss = true;
            }
        });
    };

    if (arrayShip.length === countHitsShip) {
        arrayShip.forEach(cell => {
            if (cell.shipId === currentShipId) {
                cell.explode = true;

                setMissCells(cell);
            }
        });
    }

    return field;
};

/**
 * Checking the shot hit or miss on the ship.
 *
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

/**
 * Convert an array of ships objects to an array of formatted ships.
 *
 * @param array
 */
export const convertArrayShipsToRightFormat = (array: ICell[]): number[] => {
    const temp = array.reduce((acc: Record<string, number>, { shipId }) => {
        acc[shipId] = (acc[shipId] || 0) + 1;
        return acc;
    }, {});

    return Object.values(temp).sort((a: number, b: number) => temp[b] - temp[a]);
};

/**
 * Get array of all ships.
 *
 * @param field
 */
export const getAllShips = (field: ICell[][]): number[] => {
    const allShips = field.flat().filter(cell => cell.shipId);

    return convertArrayShipsToRightFormat(allShips);
};

/**
 * Get array of non explode ships.
 *
 * @param field
 */
export const getNonExplodeShips = (field: ICell[][]): number[] => {
    const allNonExplodeShips = field.flat().filter(cell => cell.shipId && !cell.explode);

    return convertArrayShipsToRightFormat(allNonExplodeShips);
};

/**
 * Checking the end of the game.
 *
 * @param field
 */
export const isFinishGame = (field: ICell[][]): boolean => {
    return !getNonExplodeShips(field).length;
};
