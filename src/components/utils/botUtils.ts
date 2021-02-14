import { IField } from '../../redux/Field/fieldInterfaces';
import { getRandomValue } from '../../helpers';
import { getCellsAround, lockedCell } from '../../redux/Area/areaUtils';

export enum ShipDirection {
    Horizontal = 'HORIZONTAL',
    Vertical = 'VERTICAL',
}

const getRandomCellCoordinates = (square: Array<Array<IField>>): number[] => {
    const { length } = square;
    const coordinates: number[] = [];
    const number = getRandomValue(length);
    const letter = getRandomValue(length);

    coordinates.push(number, letter);

    return !square[number][letter].hit && !square[number][letter].locked && !square[number][letter].ship
        ? coordinates
        : getRandomCellCoordinates(square);
};

export const checkEmptyCells = (
    square: Array<Array<IField>>,
    calculableValue: number,
    nonCalculableValue: number,
    shipLength: number,
    direction: ShipDirection,
): boolean => {
    const isEmpty = true;

    for (let i = calculableValue; i < calculableValue + shipLength; i += 1) {
        const { hit, locked, ship } =
            direction === ShipDirection.Horizontal ? square[i][nonCalculableValue] : square[nonCalculableValue][i];

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    return isEmpty;
};

const manageShipDirection = (
    square: Array<Array<IField>>,
    positionNumber: number,
    positionLetter: number,
    shipLength: number,
    arrayLength: number,
) => {
    const { Horizontal, Vertical } = ShipDirection;
    let direction;

    if (positionNumber + shipLength < arrayLength && checkEmptyCells(square, positionNumber, positionLetter, shipLength, Vertical)) {
        direction = Vertical;
    } else if (
        positionLetter + shipLength < arrayLength &&
        checkEmptyCells(square, positionLetter, positionLetter, shipLength, Horizontal)
    ) {
        direction = Horizontal;
    } else {
        getRandomCellCoordinates(square);
        manageShipDirection(square, positionNumber, positionLetter, shipLength, arrayLength);
    }

    return direction;
};

export const buildRandomShips = (square: Array<Array<IField>>): Array<Array<IField>> => {
    const { length } = square;

    // [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    [4].forEach(shipLength => {
        let [startNumber, startLetter] = getRandomCellCoordinates(square);

        console.log(`startNumber: ${startNumber}`);
        console.log(`startLetter: ${startLetter}`);

        const startingPoint = square[startNumber][startLetter];

        startingPoint.past = true;

        console.log(startingPoint);
        console.log(`startLetter + shipLength: ${startLetter + shipLength}`);

        const shipDirection = manageShipDirection(square, startNumber, startLetter, shipLength, length);

        console.log(shipDirection);

        for (let i = 0; i < shipLength; i += 1) {
            let shipCoordinates;

            if (shipDirection === ShipDirection.Vertical) {
                shipCoordinates = square[startNumber + i][startLetter];
                startNumber += i;
            } else {
                shipCoordinates = square[startNumber][startLetter + i];
                startLetter += i;
            }

            shipCoordinates.ship = true;

            getCellsAround(square, startNumber, startLetter, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));
        }
    });

    return square;
};
