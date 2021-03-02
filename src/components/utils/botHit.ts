import { IField } from '../../store/field/interfaces';
import { updateCellNew, getPositionById, getCellsAround } from '../../store/area/areaUtils';
import { getRandomValue } from '../../helpers';
import { ShipDirection } from '../../constants/shipsConstants';

let possibleShots: IField[] = [];
let direction = '';
let firstShipHit: null | IField = null;

const randomCellInfo = (array: IField[][]): IField => {
    const { length } = array;
    const randomX = getRandomValue(length);
    const randomY = getRandomValue(length);
    const cell = array[randomX][randomY];

    return !cell.hit && !cell.past ? cell : randomCellInfo(array);
};

const randomHit = (array: IField[][]) => {
    const { Horizontal, Vertical } = ShipDirection;
    const randomIndexForPossibleShots = getRandomValue(possibleShots.length);
    let cell = randomCellInfo(array);

    if (possibleShots.length) {
        cell = possibleShots[randomIndexForPossibleShots];
        possibleShots.splice(possibleShots.indexOf(cell), 1);
    }

    if (cell.ship) {
        const [i, j] = getPositionById(array, cell.id) as number[];
        const nonDiagonalCell = getCellsAround(array, i, j, 'non-diagonal') as IField[];

        if (!possibleShots.length) {
            possibleShots.push(...nonDiagonalCell);
        }

        if (!firstShipHit) {
            firstShipHit = cell;
        } else {
            const [xFirstShip, yFirstShip] = getPositionById(array, firstShipHit.id) as number[];
            const nonDiagonalCellFirstShip = getCellsAround(array, xFirstShip, yFirstShip, 'non-diagonal') as IField[];

            if (!direction) {
                direction = i === xFirstShip ? Horizontal : Vertical;
                possibleShots = [];
            }
            if (direction === Vertical) {
                possibleShots = [...[...nonDiagonalCell, ...nonDiagonalCellFirstShip].filter((e, idx) => !(idx % 2))];
            } else if (direction === Horizontal) {
                possibleShots = [...[...nonDiagonalCell, ...nonDiagonalCellFirstShip].filter((e, idx) => idx % 2)];
            }
        }
    }

    updateCellNew(array, cell.id);

    if (cell.explode) {
        possibleShots = [];
        firstShipHit = null;
        direction = '';
    }

    possibleShots = possibleShots.filter(el => el !== null && !el.hit && !el.past);
};

const enemyHit = (array: IField[][]): IField[][] => {
    randomHit(array);

    return array;
};

export default enemyHit;
