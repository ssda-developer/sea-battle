import { CellDirection, ShipDirection } from '../enums';
import { getRandomValue } from '../helpers';
import { ICell } from '../interface';

import { isFinishGame } from './field';
import { getCellCoordsById, getCellsAround, getCellsByDirection, getRandomEmptyCell } from './cell';
import { checkShot } from './ship';

let firstHitCell: null | ICell = null;
let initialDirection: null | ShipDirection.Horizontal | ShipDirection.Vertical = null;
let initialCellsForShot: {
    VerticalCells: (ICell | null)[];
    HorizontalCells: (ICell | null)[];
} = {
    VerticalCells: [],
    HorizontalCells: [],
};

/**
 * Reset the initial values.
 */
const resetInitialValues = (): void => {
    firstHitCell = null;
    initialDirection = null;
    initialCellsForShot = {
        VerticalCells: [],
        HorizontalCells: [],
    };
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
    const { VerticalCells, HorizontalCells } = initialCellsForShot;
    let cell: ICell | null = getRandomEmptyCell(field);
    let again = false;

    if (initialDirection === Vertical) {
        cell = VerticalCells[getRandomValue(VerticalCells.length)];
    } else if (initialDirection === Horizontal) {
        cell = HorizontalCells[getRandomValue(HorizontalCells.length)];
    } else if ([...VerticalCells, ...HorizontalCells].length) {
        cell = [...VerticalCells, ...HorizontalCells][getRandomValue([...VerticalCells, ...HorizontalCells].length)];
    }

    if (cell) {
        if (cell.ship) {
            const [cellCoordX, cellCoordY] = getCellCoordsById(field, cell.id);
            const nonDiagonalCells = getCellsAround(field, cellCoordX, cellCoordY, NonDiagonal);

            VerticalCells.push(...getCellsByDirection(nonDiagonalCells, Vertical));
            HorizontalCells.push(...getCellsByDirection(nonDiagonalCells, Horizontal));

            if (firstHitCell) {
                const [firstHitCoordX, firstHitCoordY] = getCellCoordsById(field, firstHitCell.id);
                const nonDiagonalCellsFirstHitOnShip = getCellsAround(field, firstHitCoordX, firstHitCoordY, NonDiagonal);

                VerticalCells.push(...getCellsByDirection(nonDiagonalCellsFirstHitOnShip, Vertical));
                HorizontalCells.push(...getCellsByDirection(nonDiagonalCellsFirstHitOnShip, Horizontal));

                if (!initialDirection) {
                    initialDirection = cellCoordX === firstHitCoordX ? Horizontal : Vertical;
                }
            } else {
                firstHitCell = cell;
            }

            again = true;
        }

        checkShot(field, cell.id);

        if (cell.explode) {
            resetInitialValues();
        }
    }

    initialCellsForShot.VerticalCells = VerticalCells.filter(el => el && !el.hit && !el.miss);
    initialCellsForShot.HorizontalCells = HorizontalCells.filter(el => el && !el.hit && !el.miss);

    return [field, again];
};

export default randomComputerShot;
