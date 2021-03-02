import { IField } from '../store/field/interfaces';

/**
 * Generate unique ID.
 */
export const getUniqId = (): string => Math.random().toString(36).substr(2, 16);

/**
 * Generate a random value in the range 0 to maxValue.
 * @param maxValue
 */
export const getRandomValue = (maxValue: number): number => Math.floor(Math.random() * maxValue);

/**
 * Iterating over a two-dimensional array.
 * @param array
 * @param func
 * example:
 * iteratingTwoDimensionalArray(square, (i, j) => {});
 */
export const iteratingTwoDimensionalArray = (array: IField[][], func: (i: number, j: number) => void): void => {
    const { length } = array;

    for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
            func(i, j);
        }
    }
};

/**
 * Iterating the flat array.
 * @param array
 * @param func
 * example:
 * iteratingFlatArray(array, cell => {});
 */
export const iteratingFlatArray = (array: IField[][], func: (cell: IField) => void): void => {
    array.flat().forEach(cell => {
        func(cell);
    });
};
