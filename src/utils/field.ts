import { ICell } from '../interface';
import { AREA_LETTERS, AREA_NUMBERS } from '../constants';
import { getNonExplodeShips } from './ship';

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
 * Checking the end of the game.
 *
 * @param field
 */
export const isFinishGame = (field: ICell[][]): boolean => {
    return !getNonExplodeShips(field).length;
};
