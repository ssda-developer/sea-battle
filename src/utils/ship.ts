import { ICell } from '../interface';
import { getCellById, getCellCoordsById, getCellsAround } from './cell';

/**
 * Explode the ship.
 *
 * @param field
 * @param currentShipId
 */
export const explodeShip = (field: ICell[][], currentShipId: string): ICell[][] => {
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
export const checkShot = (field: ICell[][], currentCellId: string): ICell[][] => {
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
