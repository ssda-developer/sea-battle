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
    let number = getRandomValue(length);
    let letter = getRandomValue(length);

    console.log(number);
    console.log(letter);

    if (number + 4 > length && letter + 4 > length) {
        console.log('big number');
        [number, letter] = getRandomCellCoordinates(square);
    }

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

    console.log('checkEmptyCells');
    console.log(`calculableValue: ${calculableValue}`);
    console.log(`nonCalculableValue: ${nonCalculableValue}`);

    for (let i = calculableValue; i < calculableValue + shipLength; i += 1) {
        console.log(square[i][nonCalculableValue]);
        const { hit, locked, ship } =
            direction === ShipDirection.Horizontal ? square[i][nonCalculableValue] : square[nonCalculableValue][i];

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    console.log(`isEmpty: ${isEmpty}`);

    return isEmpty;
};

const manageShipDirection = (
    square: Array<Array<IField>>,
    positionNumber: number,
    positionLetter: number,
    shipLength: number,
    arrayLength: number,
) => {
    console.log('manageShipDirection');
    const { Horizontal, Vertical } = ShipDirection;
    let direction;

    if (positionNumber + shipLength < arrayLength && checkEmptyCells(square, positionNumber, positionLetter, shipLength, Vertical)) {
        console.log('manageShipDirection Vertical');
        direction = Vertical;
        return direction;
    }

    if (positionLetter + shipLength < arrayLength && checkEmptyCells(square, positionLetter, positionNumber, shipLength, Horizontal)) {
        console.log('manageShipDirection Vertical');
        direction = Horizontal;
        return direction;
    }

    console.log('manageShipDirection else');
    const [newPositionNumber, newPositionLetter] = getRandomCellCoordinates(square);
    manageShipDirection(square, newPositionNumber, newPositionLetter, shipLength, arrayLength);

    return null;
};

export const buildRandomShips = (square: Array<Array<IField>>): Array<Array<IField>> => {
    const { length } = square;

    console.log(`----------------------`);
    console.log(`buildRandomShips start`);
    console.log(`----------------------`);

    // [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    [4].forEach(shipLength => {
        const [startNumber, startLetter] = getRandomCellCoordinates(square);

        console.log(`startNumber: ${startNumber}`);
        console.log(`startLetter: ${startLetter}`);

        console.log(`startNumber + shipLength: ${startNumber + shipLength}`);
        console.log(`startLetter + shipLength: ${startLetter + shipLength}`);

        const startingPoint = square[startNumber][startLetter];

        console.log(startingPoint);

        // need to remove
        startingPoint.past = true;

        const shipDirection = manageShipDirection(square, startNumber, startLetter, shipLength, length);

        console.log(`shipDirection: ${shipDirection}`);

        for (let i = 0; i < shipLength; i += 1) {
            console.log('in loop');
            let posX = startNumber;
            let posY = startLetter;

            if (shipDirection === ShipDirection.Vertical) {
                posX += i;
            } else {
                posY += i;
            }

            console.log(`posX and posY ${posX} ${posY}`);

            square[posX][posY].ship = true;

            getCellsAround(square, posX, posY, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));
        }
    });

    return square;
};
