import { SHIPS } from '../constants';
import { CellDirection, ShipDirection } from '../enums';
import { getRandomValue, getUniqId } from '../helpers';
import { ICell } from '../interface';
import { getCellsAround, lockAllEmptyCells, lockCell } from './cell';
import { finishCreateShip } from './customCreateShip';

/**
 * Get random cell coordinates.
 *
 * @param field
 * @param shipLength
 */
const getRandomCellCoords = (field: ICell[][], shipLength: number): number[] => {
    const { length } = field;
    const coordX = getRandomValue(length);
    const coordY = getRandomValue(length);

    if (
        (coordX + shipLength > length && coordY + shipLength > length) ||
        field[coordX][coordY].hit ||
        field[coordX][coordY].lock ||
        field[coordX][coordY].ship
    ) {
        getRandomCellCoords(field, shipLength);
    }

    return [coordX, coordY];
};

/**
 * Check empty cells.
 *
 * @param field
 * @param calculableValue
 * @param nonCalculableValue
 * @param shipLength
 * @param direction
 */
const checkEmptyCells = (
    field: ICell[][],
    calculableValue: number,
    nonCalculableValue: number,
    shipLength: number,
    direction: ShipDirection,
): boolean => {
    const { Horizontal } = ShipDirection;

    for (let i = calculableValue; i < calculableValue + shipLength; i += 1) {
        const { hit, lock, ship } = direction === Horizontal ? field[nonCalculableValue][i] : field[i][nonCalculableValue];

        if (hit || lock || ship) {
            return false;
        }
    }

    return true;
};

/**
 * Get ship direction.
 *
 * @param field
 * @param coordX
 * @param coordY
 * @param shipLength
 * @param fieldLength
 */
const getShipDirection = (
    field: ICell[][],
    coordX: number,
    coordY: number,
    shipLength: number,
    fieldLength: number,
): ShipDirection | null => {
    const { Horizontal, Vertical } = ShipDirection;
    let direction = null;

    if (coordX + shipLength <= fieldLength && checkEmptyCells(field, coordX, coordY, shipLength, Vertical)) {
        direction = Vertical;
        return direction;
    }

    if (coordY + shipLength <= fieldLength && checkEmptyCells(field, coordY, coordX, shipLength, Horizontal)) {
        direction = Horizontal;
        return direction;
    }

    return direction;
};

/**
 * Get initial parameters to create a ship.
 *
 * @param field
 * @param shipLength
 */
const getInitialParams = (field: ICell[][], shipLength: number): { shipDirection: ShipDirection; coords: number[] } => {
    const { length } = field;
    const [coordX, coordY] = getRandomCellCoords(field, shipLength);
    const shipDirection = getShipDirection(field, coordX, coordY, shipLength, length);

    if (!shipDirection) {
        return getInitialParams(field, shipLength);
    }

    return {
        shipDirection,
        coords: [coordX, coordY],
    };
};

/**
 * Start creating one random ship.
 *
 * @param field
 * @param shipLength
 */
const startCreateRandomShip = (field: ICell[][], shipLength: number): ICell[][] => {
    const { Diagonal } = CellDirection;
    const { Vertical } = ShipDirection;
    const {
        shipDirection,
        coords: [coordX, coordY],
    } = getInitialParams(field, shipLength);

    const uniqShipId = getUniqId();

    for (let i = 0; i < shipLength; i += 1) {
        let posX = coordX;
        let posY = coordY;

        if (shipDirection === Vertical) {
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
 * Random location ships.
 *
 * @param field
 */
const randomLocationShips = (field: ICell[][]): ICell[][] => {
    SHIPS.forEach(shipLength => {
        startCreateRandomShip(field, shipLength);
    });
    lockAllEmptyCells(field);

    return field;
};

export default randomLocationShips;
