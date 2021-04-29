import { ICell } from '../interface';
import { getRandomValue, getUniqId } from '../helpers';
import { getCellsAround, lockAllEmptyCell } from './areaUtils';
import { CellDirection, ShipDirection } from '../enums';
import { SHIPS } from '../constants';
import { finishBuildingShip, lockCell } from './userShipLocations';

/**
 * Generate random cell coordinates.
 * @param square - Array of cells.
 * @param shipLength - Ship length.
 */
const getRandomCellCoordinates = (square: Array<Array<ICell>>, shipLength: number): number[] => {
    const { length } = square;
    const number = getRandomValue(length);
    const letter = getRandomValue(length);

    if (
        (number + shipLength > length && letter + shipLength > length) ||
        square[number][letter].hit ||
        square[number][letter].locked ||
        square[number][letter].ship
    ) {
        getRandomCellCoordinates(square, shipLength);
    }

    return [number, letter];
};

/**
 * Check empty cells.
 * @param square - Array of cells.
 * @param calculableValue
 * @param nonCalculableValue
 * @param shipLength - Ship length.
 * @param direction
 */
const checkEmptyCells = (
    square: Array<Array<ICell>>,
    calculableValue: number,
    nonCalculableValue: number,
    shipLength: number,
    direction: ShipDirection,
): boolean => {
    const isEmpty = true;

    for (let i = calculableValue; i < calculableValue + shipLength; i += 1) {
        const { hit, locked, ship } =
            direction === ShipDirection.Horizontal ? square[nonCalculableValue][i] : square[i][nonCalculableValue];

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    return isEmpty;
};

/**
 *
 * @param square - Array of cells.
 * @param positionNumber
 * @param positionLetter
 * @param shipLength - Ship length.
 * @param arrayLength
 */
const manageShipDirection = (
    square: Array<Array<ICell>>,
    positionNumber: number,
    positionLetter: number,
    shipLength: number,
    arrayLength: number,
): ShipDirection | undefined => {
    const { Horizontal, Vertical } = ShipDirection;
    let direction;

    if (positionNumber + shipLength <= arrayLength && checkEmptyCells(square, positionNumber, positionLetter, shipLength, Vertical)) {
        direction = Vertical;
        return direction;
    }

    if (positionLetter + shipLength <= arrayLength && checkEmptyCells(square, positionLetter, positionNumber, shipLength, Horizontal)) {
        direction = Horizontal;
        return direction;
    }

    return direction;
};

interface CheckBeforeBuild {
    shipDirection: ShipDirection;
    coordinates: number[];
}

/**
 *
 * @param square - Array of cells.
 * @param shipLength - Ship length.
 */
const checkBeforeBuild = (square: Array<Array<ICell>>, shipLength: number): CheckBeforeBuild => {
    const { length } = square;
    const [startNumber, startLetter] = getRandomCellCoordinates(square, shipLength);
    const shipDirection = manageShipDirection(square, startNumber, startLetter, shipLength, length);

    if (typeof shipDirection !== 'string') {
        return checkBeforeBuild(square, shipLength);
    }

    return {
        shipDirection,
        coordinates: [startNumber, startLetter],
    };
};

/**
 *
 * @param square - Array of cells.
 * @param shipLength - Ship length.
 */
const buildRandomShip = (square: Array<Array<ICell>>, shipLength: number): Array<Array<ICell>> => {
    const { Diagonal } = CellDirection;
    const {
        shipDirection,
        coordinates: [startNumber, startLetter],
    } = checkBeforeBuild(square, shipLength);

    const uniqShipId = getUniqId();

    for (let i = 0; i < shipLength; i += 1) {
        let posX = startNumber;
        let posY = startLetter;

        if (shipDirection === ShipDirection.Vertical) {
            posX += i;
        } else {
            posY += i;
        }

        square[posX][posY].ship = true;
        square[posX][posY].shipId = uniqShipId;

        getCellsAround(square, posX, posY, Diagonal).forEach(diagonalCell => lockCell(diagonalCell));
    }

    finishBuildingShip(square, uniqShipId);

    return square;
};

/**
 * Randomly place the ships.
 * @param square - Array of cells.
 */
const randomShipLocations = (square: Array<Array<ICell>>): Array<Array<ICell>> => {
    SHIPS.forEach(shipLength => {
        buildRandomShip(square, shipLength);
    });
    lockAllEmptyCell(square);

    return square;
};

export default randomShipLocations;
