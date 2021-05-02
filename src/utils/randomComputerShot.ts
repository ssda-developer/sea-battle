import { CellDirection, ShipDirection } from '../enums';
import { getRandomValue } from '../helpers';
import { ICell } from '../interface';
import { isFinishGame } from './field';
import { getCellCoordsById, getCellsAround, getRandomEmptyCell } from './cell';
import { checkShot } from './ship';

let initialCellsForShot: ICell[] = [];
let initialDirection: null | ShipDirection.Horizontal | ShipDirection.Vertical = null;
let isFirstHit: null | ICell = null;

/**
 * Reset the initial values.
 */
const resetInitialValues = (): void => {
    isFirstHit = null;
    initialDirection = null;
};

/**
 * Reset the initial ships values.
 */
const resetInitialCellsForShot = (): void => {
    initialCellsForShot = [];
};

/**
 * Random computer shot.
 *
 * @param field
 */
const randomComputerShot = (field: ICell[][]): [ICell[][], boolean] => {
    if (isFinishGame(field)) {
        return [field, false];
    }

    const { Horizontal, Vertical } = ShipDirection;
    const { NonDiagonal } = CellDirection;
    let cell = getRandomEmptyCell(field);
    let again = false;

    if (initialCellsForShot.length) {
        cell = initialCellsForShot[getRandomValue(initialCellsForShot.length)];
        initialCellsForShot.splice(initialCellsForShot.indexOf(cell), 1);
    }

    if (cell.ship) {
        const [cellCoordX, cellCoordY] = getCellCoordsById(field, cell.id);
        const nonDiagonalCells = getCellsAround(field, cellCoordX, cellCoordY, NonDiagonal) as ICell[];

        if (!initialCellsForShot.length) {
            initialCellsForShot.push(...nonDiagonalCells);
        }

        if (isFirstHit) {
            const [firstHitCoordX, firstHitCoordY] = getCellCoordsById(field, isFirstHit.id);
            const nonDiagonalCellsFirstHitOnShip = getCellsAround(field, firstHitCoordX, firstHitCoordY, NonDiagonal) as ICell[];

            if (!initialDirection) {
                initialDirection = cellCoordX === firstHitCoordX ? Horizontal : Vertical;
                resetInitialCellsForShot();
            }

            initialCellsForShot = [...nonDiagonalCells, ...nonDiagonalCellsFirstHitOnShip].filter((_, idx) =>
                initialDirection === Vertical ? idx % 2 === 0 : idx % 2 !== 0,
            );
        } else {
            isFirstHit = cell;
        }

        again = true;
    }

    checkShot(field, cell.id);

    if (cell.explode) {
        resetInitialCellsForShot();
        resetInitialValues();
    }

    initialCellsForShot = initialCellsForShot.filter(el => el !== null && !el.hit && !el.miss);

    return [field, again];
};

export default randomComputerShot;
