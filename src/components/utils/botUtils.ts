import { IField } from '../../redux/Field/fieldInterfaces';
import { getRandomValue } from '../../helpers';
import { getCellsAround, lockedCell } from '../../redux/Area/areaUtils';

export const checkEmptyCells = (square: Array<Array<IField>>, positionX: number, positionY: number, length: number): boolean => {
    const isEmpty = true;

    // console.log(positionY);

    for (let i = positionX; i < positionX + length; i += 1) {
        const { hit, locked, ship } = square[positionY][i];

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    return isEmpty;
};

export const buildRandomShips = (square: Array<Array<IField>>): Array<Array<IField>> => {
    const { length } = square;

    // [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    [4].forEach(shipLength => {
        const startX = getRandomValue(length);
        const startY = getRandomValue(length);

        const startingPoint = square[startY][startX];

        if (startX + shipLength < length) {
            if (checkEmptyCells(square, startX, startY, shipLength)) {
                for (let i = 0; i < shipLength; i += 1) {
                    const cell = square[startY][i + startX];
                    cell.ship = true;
                    getCellsAround(square, startY, i + startX, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));
                }
            }
        } // else if (startY + shipLength < length) {
        //     if (checkEmptyCells(square, startX, startY, shipLength)) {
        //         for (let i = 0; i < shipLength; i += 1) {
        //             const cell = square[i + startY][startX];
        //             cell.ship = true;
        //             getCellsAround(square, startX, i + startY, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));
        //         }
        //     }
        // }
    });

    return square;
};
