import { IField } from '../../redux/Field/fieldInterfaces';
import { updateCellNew, getPositionById, getCellById, getCellsAround } from '../../redux/Area/areaUtils';
import { getRandomValue } from '../../helpers';
import { ShipDirection } from '../../constants/shipsConstants';

// let lastEnemyHitInfo = {
//     id: '',
//     shipId: '',
//     direction: '',
// };

const randomCellInfo = (array: IField[][]): any => {
    const { length } = array;
    const randomX = getRandomValue(length);
    const randomY = getRandomValue(length);

    return !array[randomX][randomY].hit && !array[randomX][randomY].past ? array[randomX][randomY] : randomCellInfo(array);
};

let possibleShots: any[] = [];
let direction = '';
let firstShipHit: null | IField = null;

const removeCellInfoFromPossibleShots = (cellInfo: IField) => {
    if (possibleShots.length > 0) {
        const index = possibleShots.indexOf(cellInfo);
        possibleShots.splice(index, 1);
    }
};

const randomHit = (friendlySquare: IField[][]) => {
    const { Horizontal, Vertical } = ShipDirection;
    let cellInfo = randomCellInfo(friendlySquare);
    const randomIndexForPossibleShots = getRandomValue(possibleShots.length);
    // console.log(cellInfo);

    if (possibleShots.length > 0) {
        cellInfo = possibleShots[randomIndexForPossibleShots];
        // console.log(cellInfo);
    }

    if (cellInfo.ship) {
        const [i, j] = getPositionById(friendlySquare, cellInfo.id);
        const nonDiagonalCell = getCellsAround(friendlySquare, i, j, 'non-diagonal');
        if (!firstShipHit) {
            firstShipHit = cellInfo;
        } else {
            const [fI] = getPositionById(friendlySquare, firstShipHit.id);
            if (!direction) {
                direction = i === fI ? Horizontal : Vertical;
            }
        }
        removeCellInfoFromPossibleShots(cellInfo);
        if (direction && direction === Vertical) {
            possibleShots = [nonDiagonalCell[0], nonDiagonalCell[2]];
        } else if (direction && direction === Horizontal) {
            possibleShots = [nonDiagonalCell[1], nonDiagonalCell[3]];
        } else {
            possibleShots = [...possibleShots, ...nonDiagonalCell];
        }
        randomHit(friendlySquare);
    } else if (cellInfo.hit) {
        randomHit(friendlySquare);
    } else if (cellInfo.past) {
        direction = '';
        removeCellInfoFromPossibleShots(cellInfo);
        // randomHit(friendlySquare);
    } else {
        removeCellInfoFromPossibleShots(cellInfo);
        direction = '';
    }

    console.log(direction);
    console.log(possibleShots);
    updateCellNew(friendlySquare, cellInfo.id);

    if (cellInfo.explode) {
        direction = '';
        firstShipHit = null;
        possibleShots = [];
    }
};

// const randomHit = (friendlySquare: IField[][]) => {
//     console.log('randomHit');
//     const { Horizontal, Vertical } = ShipDirection;
//     let rand = null;
//     console.log(lastEnemyHitInfo);
//     let cell;
//     if (!lastEnemyHitInfo.shipId) {
//         console.log('if');
//         cell = randomCell(friendlySquare);
//     } else {
//         console.log('else');
//         const [i, j] = getPositionById(friendlySquare, lastEnemyHitInfo.id);
//         const aroundCells = getCellsAround(friendlySquare, i, j, 'non-diagonal');
//         rand = getRandomValue(aroundCells.length);
//         let cellRandomAround = aroundCells[rand] as IField;
//         if (lastEnemyHitInfo.direction === Vertical) {
//             cellRandomAround = aroundCells[[0, 2][getRandomValue(1)]] as IField;
//         } else if (lastEnemyHitInfo.direction === Horizontal) {
//             cellRandomAround = aroundCells[[1, 3][getRandomValue(1)]] as IField;
//         }
//         cell = cellRandomAround;
//     }
//
//     console.log(cell);
//     const arrayCell = getCellById(friendlySquare, cell.id) as IField;
//     updateCellNew(friendlySquare, cell.id);
//
//     if (arrayCell.hit) {
//         if (rand && lastEnemyHitInfo.direction.length === 0) {
//             lastEnemyHitInfo.direction = rand % 2 === 0 ? Vertical : Horizontal;
//         }
//         lastEnemyHitInfo = {
//             id: cell.id,
//             shipId: cell.shipId,
//             direction: lastEnemyHitInfo.direction,
//         };
//         randomHit(friendlySquare);
//     } else if (arrayCell.past) {
//         randomHit(friendlySquare);
//     } else if (arrayCell.explode) {
//         lastEnemyHitInfo = {
//             id: '',
//             shipId: '',
//             direction: '',
//         };
//     } else {
//         lastEnemyHitInfo = {
//             id: lastEnemyHitInfo.id,
//             shipId: lastEnemyHitInfo.shipId,
//             direction: '',
//         };
//     }
// };

const enemyHit = (friendlySquare: IField[][]) => {
    console.log('enemyHit');
    randomHit(friendlySquare);

    return friendlySquare;
};

export default enemyHit;
