import { IField } from '../../redux/Field/fieldInterfaces';
import { updateCellNew, getPositionById, getCellById, getCellsAround } from '../../redux/Area/areaUtils';
import { getRandomValue } from '../../helpers';
import { ShipDirection } from '../../constants/shipsConstants';

let lastEnemyHitInfo = {
    id: '',
    shipId: '',
    direction: '',
};

const randomCell = (array: IField[][]): any => {
    const { length } = array;
    const randomX = getRandomValue(length);
    const randomY = getRandomValue(length);

    return !array[randomX][randomY].hit && !array[randomX][randomY].past ? array[randomX][randomY] : randomCell(array);
};

const randomHit = (friendlySquare: IField[][]) => {
    console.log('randomHit');
    const { Horizontal, Vertical } = ShipDirection;
    let rand = null;
    console.log(lastEnemyHitInfo);
    let cell;
    if (!lastEnemyHitInfo.shipId) {
        console.log('if');
        cell = randomCell(friendlySquare);
    } else {
        console.log('else');
        const [i, j] = getPositionById(friendlySquare, lastEnemyHitInfo.id);
        const aroundCells = getCellsAround(friendlySquare, i, j, 'non-diagonal');
        rand = getRandomValue(aroundCells.length);
        let cellRandomAround = aroundCells[rand] as IField;
        if (lastEnemyHitInfo.direction === Vertical) {
            cellRandomAround = aroundCells[[0, 2][getRandomValue(1)]] as IField;
        } else if (lastEnemyHitInfo.direction === Horizontal) {
            cellRandomAround = aroundCells[[1, 3][getRandomValue(1)]] as IField;
        }
        cell = cellRandomAround;
    }

    console.log(cell);
    const arrayCell = getCellById(friendlySquare, cell.id) as IField;
    updateCellNew(friendlySquare, cell.id);

    if (arrayCell.hit) {
        if (rand && lastEnemyHitInfo.direction.length === 0) {
            lastEnemyHitInfo.direction = rand % 2 === 0 ? Vertical : Horizontal;
        }
        lastEnemyHitInfo = {
            id: cell.id,
            shipId: cell.shipId,
            direction: lastEnemyHitInfo.direction,
        };
        randomHit(friendlySquare);
    } else if (arrayCell.past) {
        randomHit(friendlySquare);
    } else if (arrayCell.explode) {
        lastEnemyHitInfo = {
            id: '',
            shipId: '',
            direction: '',
        };
    } else {
        lastEnemyHitInfo = {
            id: lastEnemyHitInfo.id,
            shipId: lastEnemyHitInfo.shipId,
            direction: '',
        };
    }
};

const enemyHit = (friendlySquare: IField[][]) => {
    console.log('enemyHit');
    randomHit(friendlySquare);

    return friendlySquare;
};

export default enemyHit;
