import { IField } from '../../store/field/interfaces';
import { updateCell, getPositionCellById, getCellsAround } from '../../store/area/areaUtils';
import { getRandomValue } from '../../helpers';
import { CellDirection, ShipDirection } from '../../constants/shipsConstants';

let possibleShots: IField[] = [];
let direction = '';
let firstHitOnShip: null | IField = null;

const getRandomCell = (array: IField[][]): IField => {
    const { Diagonal, NonDiagonal } = CellDirection;
    const { length } = array;
    const xPoint = getRandomValue(length);
    const yPoint = getRandomValue(length);
    const cell = array[xPoint][yPoint];
    const isNearShip = [...getCellsAround(array, xPoint, yPoint, NonDiagonal), ...getCellsAround(array, xPoint, yPoint, Diagonal)].filter(
        c => c?.explode,
    );

    return !cell.hit && !cell.past && !isNearShip.length ? cell : getRandomCell(array);
};

const randomShot = (array: IField[][]) => {
    const { Horizontal, Vertical } = ShipDirection;
    const { NonDiagonal } = CellDirection;
    let cell = getRandomCell(array);

    if (possibleShots.length) {
        cell = possibleShots[getRandomValue(possibleShots.length)];
        possibleShots.splice(possibleShots.indexOf(cell), 1);
    }

    if (cell.ship) {
        const [i, j] = getPositionCellById(array, cell.id) as number[];
        const nonDiagonalCell = getCellsAround(array, i, j, NonDiagonal) as IField[];

        if (!possibleShots.length) {
            possibleShots.push(...nonDiagonalCell);
        }

        if (!firstHitOnShip) {
            firstHitOnShip = cell;
        } else {
            const [xPoint, yPoint] = getPositionCellById(array, firstHitOnShip.id) as number[];
            const nonDiagonalCellsFirstHitOnShip = getCellsAround(array, xPoint, yPoint, NonDiagonal) as IField[];

            if (!direction) {
                direction = i === xPoint ? Horizontal : Vertical;
                possibleShots = [];
            }

            if (direction === Vertical) {
                possibleShots = [...[...nonDiagonalCell, ...nonDiagonalCellsFirstHitOnShip].filter((c, idx) => !(idx % 2))];
            } else if (direction === Horizontal) {
                possibleShots = [...[...nonDiagonalCell, ...nonDiagonalCellsFirstHitOnShip].filter((c, idx) => idx % 2)];
            }
        }
    }

    updateCell(array, cell.id);

    if (cell.explode) {
        possibleShots = [];
        firstHitOnShip = null;
        direction = '';
    }

    possibleShots = possibleShots.filter(el => el !== null && !el.hit && !el.past);
};

const computerShot = (array: IField[][]): IField[][] => {
    randomShot(array);

    return array;
};

export default computerShot;
