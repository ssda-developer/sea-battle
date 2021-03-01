import { IField } from '../../redux/Field/fieldInterfaces';
import { updateCellNew, getPositionById, getCellsAround } from '../../redux/Area/areaUtils';
import { getRandomValue } from '../../helpers';
import { ShipDirection } from '../../constants/shipsConstants';

let possibleShots: IField[] = [];
let direction = '';
let firstShipHit: null | IField = null;

const randomCellInfo = (array: IField[][]): IField => {
    const { length } = array;
    const randomX = getRandomValue(length);
    const randomY = getRandomValue(length);

    return !array[randomX][randomY].hit && !array[randomX][randomY].past ? array[randomX][randomY] : randomCellInfo(array);
};

const randomHit = (friendlySquare: IField[][]) => {
    const { Horizontal, Vertical } = ShipDirection;
    const randomIndexForPossibleShots = getRandomValue(possibleShots.length);
    let cellInfo = randomCellInfo(friendlySquare);

    if (possibleShots.length > 0) {
        cellInfo = possibleShots[randomIndexForPossibleShots];
        possibleShots.splice(possibleShots.indexOf(cellInfo), 1);
    }

    if (cellInfo.ship) {
        const [i, j] = getPositionById(friendlySquare, cellInfo.id) as number[];
        const nonDiagonalCell = getCellsAround(friendlySquare, i, j, 'non-diagonal') as IField[];
        if (possibleShots.length === 0) {
            possibleShots.push(...nonDiagonalCell);
        }
        if (!firstShipHit) {
            firstShipHit = cellInfo;
        } else {
            const [xFirstShip, yFirstShip] = getPositionById(friendlySquare, firstShipHit.id) as number[];
            const nonDiagonalCellFirstShip = getCellsAround(friendlySquare, xFirstShip, yFirstShip, 'non-diagonal') as IField[];

            if (!direction) {
                direction = i === xFirstShip ? Horizontal : Vertical;
                possibleShots = [];
            }
            if (direction === Vertical) {
                possibleShots = [nonDiagonalCell[0], nonDiagonalCell[2], nonDiagonalCellFirstShip[0], nonDiagonalCellFirstShip[2]];
            } else if (direction === Horizontal) {
                possibleShots = [nonDiagonalCell[1], nonDiagonalCell[3], nonDiagonalCellFirstShip[1], nonDiagonalCellFirstShip[3]];
            }
        }
    }

    updateCellNew(friendlySquare, cellInfo.id);

    if (cellInfo.explode) {
        possibleShots = [];
        firstShipHit = null;
        direction = '';
    }

    possibleShots = possibleShots.filter(el => el !== null && !el.hit && !el.past);
};

const enemyHit = (friendlySquare: IField[][]) => {
    randomHit(friendlySquare);

    return friendlySquare;
};

export default enemyHit;
