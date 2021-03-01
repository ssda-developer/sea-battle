import { IField } from '../Field/fieldInterfaces';
import { getUniqId, iteratingTwoDimensionalArray } from '../../helpers';

export const getCellById = (square: IField[][], id: string): IField | null => {
    let cell: IField | null = null;

    iteratingTwoDimensionalArray(square, (i, j) => {
        const currentCell = square[i][j];

        if (currentCell.id === id) {
            cell = currentCell;
        }
    });

    return cell;
};

export const getPositionById = (square: IField[][], id: string): number[] => {
    let position: number[] = [];

    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = square[i][j];

        if (cell.id === id) {
            position = [i, j];
        }
    });

    return position;
};

const shipExplosion = (array: IField[][], currentShipId: string) => {
    let shipField = 0;
    let shipHit = 0;

    array.flat().forEach(cell => {
        if (cell.shipId === currentShipId) {
            shipField += 1;
            if (cell.hit) {
                shipHit += 1;
            }
        }
    });

    if (shipField === shipHit) {
        array.flat().forEach(cell => {
            if (cell.shipId === currentShipId) {
                cell.explode = true;
            }
        });
    }

    return array;
};

export const updateCellNew = (array: IField[][], currentCellId: string): IField[][] => {
    const arrayCell = getCellById(array, currentCellId) as IField;

    if (arrayCell.ship) {
        arrayCell.hit = true;
        array = shipExplosion(array, arrayCell.shipId);
    } else {
        arrayCell.past = true;
    }

    return array;
};

export const updateCell = (enemySquare: IField[][], friendlySquare: IField[][], currentCellId: string): IField[][] => {
    const currentEnemyCell = getCellById(enemySquare, currentCellId);
    const currentFriendlyCell = getCellById(friendlySquare, currentCellId);

    if (currentFriendlyCell && currentEnemyCell) {
        if (currentFriendlyCell.ship) {
            currentEnemyCell.hit = true;
        } else {
            currentEnemyCell.past = true;
        }
    }

    return enemySquare;
};

const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
let isStartClickBuildShip = true;
let uniqShipId = getUniqId();
let currentShipLength = 0;

const resetStartingValues = () => {
    isStartClickBuildShip = true;
    uniqShipId = getUniqId();
    currentShipLength = 0;
};

export const getCellsAround = (square: IField[][], i: number, j: number, direction: 'diagonal' | 'non-diagonal'): (IField | null)[] => {
    const { length } = square;
    const [numberUp, letterRight, numberDown, letterLeft] = [i - 1, j + 1, i + 1, j - 1];

    if (direction === 'diagonal') {
        return [
            numberUp >= 0 && letterLeft >= 0 ? square[numberUp][letterLeft] : null,
            numberUp >= 0 && letterRight < length ? square[numberUp][letterRight] : null,
            numberDown < length && letterLeft >= 0 ? square[numberDown][letterLeft] : null,
            numberDown < length && letterRight < length ? square[numberDown][letterRight] : null,
        ];
    }

    if (direction === 'non-diagonal') {
        return [
            numberUp >= 0 ? square[numberUp][j] : null,
            letterRight < length ? square[i][letterRight] : null,
            numberDown < length ? square[numberDown][j] : null,
            letterLeft >= 0 ? square[i][letterLeft] : null,
        ];
    }

    return [];
};

export const lockedCell = (cell: IField | null): void => {
    if (cell && !cell.ship) {
        cell.locked = true;
        cell.lockedId = cell.lockedId.length === 0 ? `locked-${uniqShipId}` : cell.lockedId;
    }
};

export const finishBuildingShip = (square: IField[][], currentShipId: string): IField[][] => {
    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = square[i][j];

        if (cell.shipId === currentShipId) {
            getCellsAround(square, i, j, 'non-diagonal').forEach(nonDiagonalCell => lockedCell(nonDiagonalCell));
        }
    });
    resetStartingValues();

    return square;
};

const removeWrongShip = (square: IField[][], currentShipId: string): IField[][] => {
    square.flat().forEach(cell => {
        if (cell.shipId === currentShipId || cell.lockedId === `locked-${currentShipId}`) {
            cell.ship = false;
            cell.shipId = '';
            cell.locked = false;
            cell.lockedId = '';
        }
    });

    resetStartingValues();

    return square;
};

export const addShip = (square: IField[][], currentCellId: string): IField[][] => {
    let array = square;

    iteratingTwoDimensionalArray(square, (i, j) => {
        const cell = array[i][j];

        if (cell.id === currentCellId) {
            const [cellUp, cellRight, cellDown, cellLeft] = getCellsAround(array, i, j, 'non-diagonal');

            if (
                cellUp?.shipId === uniqShipId ||
                cellRight?.shipId === uniqShipId ||
                cellDown?.shipId === uniqShipId ||
                cellLeft?.shipId === uniqShipId ||
                isStartClickBuildShip
            ) {
                const maxShipLength = Math.max(...ships);
                currentShipLength += 1;

                getCellsAround(array, i, j, 'diagonal').forEach(diagonalCell => lockedCell(diagonalCell));

                cell.ship = true;
                cell.shipId = uniqShipId;
                isStartClickBuildShip = false;

                if (currentShipLength === maxShipLength) {
                    ships.splice(ships.indexOf(currentShipLength), 1);
                    array = finishBuildingShip(array, uniqShipId);
                }
            } else {
                const index = ships.indexOf(currentShipLength);
                if (index >= 0) {
                    ships.splice(index, 1);
                    array = finishBuildingShip(array, uniqShipId);
                } else {
                    removeWrongShip(array, uniqShipId);
                }

                addShip(square, currentCellId);
            }
        }
    });

    if (ships.length === 0) {
        array.flat().forEach(cell => {
            if (!cell.ship) {
                cell.locked = true;
            }
        });
    }

    return array;
};
