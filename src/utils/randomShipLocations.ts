import { ICell } from '../interface';
import { getRandomValue, getUniqId } from '../helpers';
import { getCellsAround, lockAllEmptyCells, lockCell } from './areaUtils';
import { CellDirection, ShipDirection } from '../enums';
import { SHIPS } from '../constants';
import { finishCreateShip } from './customCreateShip';

/**
 * Generate random cell coordinates.
 * @param field - Array of cells.
 * @param shipLength - Ship length.
 */
const getRandomCellCoordinates = (field: Array<Array<ICell>>, shipLength: number): number[] => {
    const { length } = field;
    const number = getRandomValue(length);
    const letter = getRandomValue(length);

    if (
        (number + shipLength > length && letter + shipLength > length) ||
        field[number][letter].hit ||
        field[number][letter].locked ||
        field[number][letter].ship
    ) {
        getRandomCellCoordinates(field, shipLength);
    }

    return [number, letter];
};

/**
 * Check empty cells.
 * @param field - Array of cells.
 * @param calculableValue
 * @param nonCalculableValue
 * @param shipLength - Ship length.
 * @param direction
 */
const checkEmptyCells = (
    field: Array<Array<ICell>>,
    calculableValue: number,
    nonCalculableValue: number,
    shipLength: number,
    direction: ShipDirection,
): boolean => {
    const isEmpty = true;

    for (let i = calculableValue; i < calculableValue + shipLength; i += 1) {
        const { hit, locked, ship } = direction === ShipDirection.Horizontal ? field[nonCalculableValue][i] : field[i][nonCalculableValue];

        if (hit || locked || ship) {
            return !isEmpty;
        }
    }

    return isEmpty;
};

/**
 *
 * @param field - Array of cells.
 * @param positionNumber
 * @param positionLetter
 * @param shipLength - Ship length.
 * @param arrayLength
 */
const manageShipDirection = (
    field: Array<Array<ICell>>,
    positionNumber: number,
    positionLetter: number,
    shipLength: number,
    arrayLength: number,
): ShipDirection | undefined => {
    const { Horizontal, Vertical } = ShipDirection;
    let direction;

    if (positionNumber + shipLength <= arrayLength && checkEmptyCells(field, positionNumber, positionLetter, shipLength, Vertical)) {
        direction = Vertical;
        return direction;
    }

    if (positionLetter + shipLength <= arrayLength && checkEmptyCells(field, positionLetter, positionNumber, shipLength, Horizontal)) {
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
 * @param field - Array of cells.
 * @param shipLength - Ship length.
 */
const checkBeforeBuild = (field: Array<Array<ICell>>, shipLength: number): CheckBeforeBuild => {
    const { length } = field;
    const [startNumber, startLetter] = getRandomCellCoordinates(field, shipLength);
    const shipDirection = manageShipDirection(field, startNumber, startLetter, shipLength, length);

    if (typeof shipDirection !== 'string') {
        return checkBeforeBuild(field, shipLength);
    }

    return {
        shipDirection,
        coordinates: [startNumber, startLetter],
    };
};

/**
 *
 * @param field - Array of cells.
 * @param shipLength - Ship length.
 */
const buildRandomShip = (field: Array<Array<ICell>>, shipLength: number): Array<Array<ICell>> => {
    const { Diagonal } = CellDirection;
    const {
        shipDirection,
        coordinates: [startNumber, startLetter],
    } = checkBeforeBuild(field, shipLength);

    const uniqShipId = getUniqId();

    for (let i = 0; i < shipLength; i += 1) {
        let posX = startNumber;
        let posY = startLetter;

        if (shipDirection === ShipDirection.Vertical) {
            posX += i;
        } else {
            posY += i;
        }

        field[posX][posY].ship = true;
        field[posX][posY].shipId = uniqShipId;

        getCellsAround(field, posX, posY, Diagonal).forEach(diagonalCell => lockCell(diagonalCell, uniqShipId));
    }

    finishCreateShip(field, uniqShipId);

    return field;
};

/**
 * Randomly place the ships.
 * @param field - Array of cells.
 */
const randomShipLocations = (field: Array<Array<ICell>>): Array<Array<ICell>> => {
    SHIPS.forEach(shipLength => {
        buildRandomShip(field, shipLength);
    });
    lockAllEmptyCells(field);

    return field;
};

export default randomShipLocations;
