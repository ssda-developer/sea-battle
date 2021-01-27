import { IField } from '../Field/fieldInterfaces';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';
import getUniqId from '../../helpers';

export const createSquare = (): Array<Array<IField>> => {
    const square: Array<Array<IField>> = [];

    AREA_NUMBERS.forEach(number => {
        const row: Array<IField> = [];

        AREA_LETTERS.forEach(letter => {
            const cell = {
                id: `${number}${letter}`,
                ship: false,
                shipId: '',
                hit: false,
                past: false,
                locked: false,
                lockedId: '',
            };

            row.push(cell);
        });

        square.push(row);
    });

    return square;
};

export const updateCell = (square: Array<Array<IField>>, currentCellId: string): Array<Array<IField>> => {
    const array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];
            if (cell.id === currentCellId) {
                if (cell.ship) {
                    cell.hit = true;
                } else {
                    cell.past = true;
                }
            }
        }
    }

    return array;
};

let firstClick = true;
let uniqShipId = getUniqId();
let currentLength = 0;
const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const getShifts = (i: number, j: number) => {
    return {
        shiftUp: i - 1,
        shiftRight: j + 1,
        shiftDown: i + 1,
        shiftLeft: j - 1,
    };
};

const getDiagonalCell = (square: Array<Array<IField>>, i: number, j: number) => {
    const { shiftUp, shiftRight, shiftDown, shiftLeft } = getShifts(i, j);
    const { length } = square;

    return [
        shiftUp >= 0 && shiftLeft >= 0 ? square[shiftUp][shiftLeft] : null,
        shiftUp >= 0 && shiftRight < length ? square[shiftUp][shiftRight] : null,
        shiftDown < length && shiftLeft >= 0 ? square[shiftDown][shiftLeft] : null,
        shiftDown < length && shiftRight < length ? square[shiftDown][shiftRight] : null,
    ];
};

const getNonDiagonalCell = (square: Array<Array<IField>>, i: number, j: number) => {
    const { shiftUp, shiftRight, shiftDown, shiftLeft } = getShifts(i, j);
    const { length } = square;

    return [
        shiftUp >= 0 ? square[shiftUp][j] : null,
        shiftRight < length ? square[i][shiftRight] : null,
        shiftDown < length ? square[shiftDown][j] : null,
        shiftLeft >= 0 ? square[i][shiftLeft] : null,
    ];
};

const lockedCell = (cellQwe: IField | null) => {
    const cell = cellQwe;

    if (cell && !cell.ship) {
        cell.locked = true;
        if (cell.lockedId.length === 0) {
            cell.lockedId = `locked-${uniqShipId}`;
        }
    }
};

const finishBuildingShip = (square: Array<Array<IField>>, currentShipId: string): Array<Array<IField>> => {
    const { length } = square;

    for (let i = 0; i < length; i += 1) {
        for (let j = 0; j < length; j += 1) {
            const cell = square[i][j];

            if (cell.shipId === currentShipId) {
                getNonDiagonalCell(square, i, j).forEach(nonDiagonalCell => lockedCell(nonDiagonalCell));
            }
        }
    }

    firstClick = true;
    uniqShipId = getUniqId();
    currentLength = 0;

    return square;
};

const removeWrongShip = (square: Array<Array<IField>>, currentShipId: string): Array<Array<IField>> => {
    square.flat().forEach(cell => {
        if (cell.shipId === currentShipId || cell.lockedId === `locked-${currentShipId}`) {
            cell.ship = false;
            cell.shipId = '';
            cell.locked = false;
            cell.lockedId = '';
        }
    });

    firstClick = true;

    return square;
};

export const addShip = (square: Array<Array<IField>>, currentCellId: string): Array<Array<IField>> => {
    let array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];

            if (cell.id === currentCellId) {
                const [cellUp, cellRight, cellDown, cellLeft] = getNonDiagonalCell(array, i, j);

                if (
                    (cellUp && cellUp.shipId === uniqShipId) ||
                    (cellRight && cellRight.shipId === uniqShipId) ||
                    (cellDown && cellDown.shipId === uniqShipId) ||
                    (cellLeft && cellLeft.shipId === uniqShipId) ||
                    firstClick
                ) {
                    currentLength += 1;
                    const maxLengthShip = Math.max(...ships);

                    getDiagonalCell(array, i, j).forEach(diagonalCell => lockedCell(diagonalCell));

                    cell.ship = true;
                    cell.shipId = uniqShipId;
                    firstClick = false;

                    if (currentLength === maxLengthShip) {
                        // eslint-disable-next-line @typescript-eslint/no-loop-func
                        const index: number = ships.findIndex(ship => ship === currentLength);
                        ships.splice(index, 1);
                        array = finishBuildingShip(array, uniqShipId);
                    }
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-loop-func
                    const index: number = ships.findIndex(ship => ship === currentLength);
                    if (index >= 0) {
                        ships.splice(index, 1);
                        array = finishBuildingShip(array, uniqShipId);
                    } else {
                        removeWrongShip(array, uniqShipId);
                    }

                    currentLength = 0;
                    addShip(square, currentCellId);
                }
            }
        }
    }

    if (ships.length === 0) {
        array.flat().forEach(cell => {
            if (!cell.ship) {
                cell.locked = true;
            }
        });
    }

    return array;
};

// const [cellUpLeft, cellUpRight, cellDownLeft, cellDownRight] = getDiagonalCell(array, i, j);

// const testCheck = (array: any) => {
//     const result = {} as any;
//     array.flat().forEach((cell: any) => {
//         if (cell.shipId.length !== 0) {
//             result[cell.shipId] = result[cell.shipId] + 1 || 1;
//         }
//     });
//
//     console.clear();
//     console.log(ships.sort());
//     console.log(Object.values(result).sort());
// };
