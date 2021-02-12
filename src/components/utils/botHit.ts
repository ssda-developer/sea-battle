import { IField } from '../../redux/Field/fieldInterfaces';
import { updateCellNew, getPositionById, getCellById } from '../../redux/Area/areaUtils';
import { getRandomValue } from '../../helpers';

let lastEnemyHitInfo = {
    id: '',
    shipId: '',
};

const randomCell = (array: IField[][]): any => {
    const { length } = array;
    const randomX = getRandomValue(length);
    const randomY = getRandomValue(length);

    return !array[randomX][randomY].hit && !array[randomX][randomY].past ? array[randomX][randomY] : randomCell(array);
};

const randomHit = (friendlySquare: IField[][]) => {
    // console.log(lastEnemyHitInfo);
    let cell;
    if (!lastEnemyHitInfo.shipId) {
        cell = randomCell(friendlySquare);
    } else {
        const [i, j] = getPositionById(friendlySquare, lastEnemyHitInfo.id);
        cell = friendlySquare[i][j + 1];
    }

    const arrayCell = getCellById(friendlySquare, cell.id) as IField;
    updateCellNew(friendlySquare, cell.id);

    if (arrayCell.ship) {
        lastEnemyHitInfo = {
            id: arrayCell.id,
            shipId: arrayCell.shipId,
        };
        randomHit(friendlySquare);
    } else {
        lastEnemyHitInfo = {
            id: '',
            shipId: '',
        };
    }
};

const enemyHit = (friendlySquare: IField[][]) => {
    console.log('enemyHit');
    randomHit(friendlySquare);

    return friendlySquare;
};

export default enemyHit;
