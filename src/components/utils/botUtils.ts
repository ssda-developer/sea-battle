import { IField } from '../../redux/Field/fieldInterfaces';
import { getRandomValue } from '../../helpers';
import { getCellsAround, lockedCell } from '../../redux/Area/areaUtils';

export const checkEmptyCells = (square: Array<Array<IField>>, positionNumber: number, positionLetter: number, length: number): boolean => {
    const isEmpty = true;

    for (let i = positionLetter; i < positionLetter + length; i += 1) {
        const { hit, locked, ship } = square[positionNumber][i];

        // console.log(square[positionNumber][i]);

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    return isEmpty;
};

// const manageShipDirection = () => {
//
// };

export const buildRandomShips = (square: Array<Array<IField>>): Array<Array<IField>> => {
    const { length } = square;

    // console.log(square);

    // [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    [4].forEach(shipLength => {
        const startNumber = getRandomValue(length);
        const startLetter = getRandomValue(length);

        // console.log(`startNumber: ${startNumber}`);
        // console.log(`startLetter: ${startLetter}`);

        const startingPoint = square[startNumber][startLetter];

        startingPoint.past = true;

        // console.log(startingPoint);
        // console.log(`startLetter + shipLength: ${startLetter + shipLength}`);

        if (startLetter + shipLength < length && checkEmptyCells(square, startNumber, startLetter, shipLength)) {
            for (let i = 0; i < shipLength; i += 1) {
                const cell = square[startNumber][startLetter + i];
                cell.ship = true;
                getCellsAround(square, startNumber, startLetter + i, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));
            }
        }
    });

    return square;
};
