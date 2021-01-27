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
    console.log(square);
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
let temporarilyMaxLength = 4;
let temporarilyShipId = getUniqId();
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

    return {
        cellUpLeft: shiftUp >= 0 && shiftLeft >= 0 ? square[shiftUp][shiftLeft] : null,
        cellUpRight: shiftUp >= 0 && shiftRight < length ? square[shiftUp][shiftRight] : null,
        cellDownLeft: shiftDown < length && shiftLeft >= 0 ? square[shiftDown][shiftLeft] : null,
        cellDownRight: shiftDown < length && shiftRight < length ? square[shiftDown][shiftRight] : null,
    };
};

const getNonDiagonalCell = (square: Array<Array<IField>>, i: number, j: number) => {
    const { shiftUp, shiftRight, shiftDown, shiftLeft } = getShifts(i, j);
    const { length } = square;

    return {
        cellUp: shiftUp >= 0 ? square[shiftUp][j] : null,
        cellRight: shiftRight < length ? square[i][shiftRight] : null,
        cellDown: shiftDown < length ? square[shiftDown][j] : null,
        cellLeft: shiftLeft >= 0 ? square[i][shiftLeft] : null,
    };
};

const finishBuildingShip = (square: Array<Array<IField>>, shipId: string) => {
    const array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];

            if (cell.shipId === shipId) {
                const { cellUp, cellRight, cellDown, cellLeft } = getNonDiagonalCell(array, i, j);

                if (cellUp && !cellUp.ship) {
                    cellUp.locked = true;
                    if (cellUp.lockedId.length === 0) {
                        cellUp.lockedId = `locked-${temporarilyShipId}`;
                    }
                }
                if (cellRight && !cellRight.ship) {
                    cellRight.locked = true;
                    if (cellRight.lockedId.length === 0) {
                        cellRight.lockedId = `locked-${temporarilyShipId}`;
                    }
                }
                if (cellDown && !cellDown.ship) {
                    cellDown.locked = true;
                    if (cellDown.lockedId.length === 0) {
                        cellDown.lockedId = `locked-${temporarilyShipId}`;
                    }
                }
                if (cellLeft && !cellLeft.ship) {
                    cellLeft.locked = true;
                    if (cellLeft.lockedId.length === 0) {
                        cellLeft.lockedId = `locked-${temporarilyShipId}`;
                    }
                }
            }
        }
    }

    firstClick = true;
    temporarilyShipId = getUniqId();
    currentLength = 0;

    return array;
};

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

const resetShip = (square: Array<Array<IField>>, shipId: string) => {
    const array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];

            if (cell.shipId === shipId || cell.lockedId === `locked-${shipId}`) {
                cell.ship = false;
                cell.shipId = '';
                cell.locked = false;
                cell.lockedId = '';
            }
        }
    }

    firstClick = true;
    temporarilyMaxLength = 4;

    return array;
};

const lockedCell = (cellQwe: IField | null) => {
    const cell = cellQwe;

    if (cell && !cell.ship) {
        cell.locked = true;
        if (cell.lockedId.length === 0) {
            cell.lockedId = `locked-${temporarilyShipId}`;
        }
    }
};

export const addShip = (square: Array<Array<IField>>, currentCellId: string): Array<Array<IField>> => {
    let array = square;
    const arrayLength = square.length;

    for (let i = 0; i < arrayLength; i += 1) {
        for (let j = 0; j < arrayLength; j += 1) {
            const cell = array[i][j];

            if (cell.id === currentCellId) {
                const { cellUpLeft, cellUpRight, cellDownLeft, cellDownRight } = getDiagonalCell(array, i, j);
                const { cellUp, cellRight, cellDown, cellLeft } = getNonDiagonalCell(array, i, j);

                if (
                    temporarilyMaxLength > 0 &&
                    ((cellUp && cellUp.shipId === temporarilyShipId) ||
                        (cellRight && cellRight.shipId === temporarilyShipId) ||
                        (cellDown && cellDown.shipId === temporarilyShipId) ||
                        (cellLeft && cellLeft.shipId === temporarilyShipId) ||
                        firstClick)
                ) {
                    currentLength += 1;
                    // eslint-disable-next-line prefer-spread
                    const maxShipsLength = Math.max.apply(Math, ships);
                    console.log(ships);

                    lockedCell(cellUpLeft);
                    lockedCell(cellDownLeft);
                    lockedCell(cellUpRight);
                    lockedCell(cellDownRight);
                    // if (cellUpLeft && !cellUpLeft.ship) {
                    //     console.log(cellUpLeft);
                    //     cellUpLeft.locked = true;
                    //     if (cellUpLeft.lockedId.length === 0) {
                    //         cellUpLeft.lockedId = `locked-${temporarilyShipId}`;
                    //     }
                    // }
                    // if (cellDownLeft && !cellDownLeft.ship) {
                    //     cellDownLeft.locked = true;
                    //     if (cellDownLeft.lockedId.length === 0) {
                    //         cellDownLeft.lockedId = `locked-${temporarilyShipId}`;
                    //     }
                    // }
                    // if (cellUpRight && !cellUpRight.ship) {
                    //     cellUpRight.locked = true;
                    //     if (cellUpRight.lockedId.length === 0) {
                    //         cellUpRight.lockedId = `locked-${temporarilyShipId}`;
                    //     }
                    // }
                    // if (cellDownRight && !cellDownRight.ship) {
                    //     cellDownRight.locked = true;
                    //     if (cellDownRight.lockedId.length === 0) {
                    //         cellDownRight.lockedId = `locked-${temporarilyShipId}`;
                    //     }
                    // }

                    cell.ship = true;
                    cell.shipId = temporarilyShipId;
                    firstClick = false;

                    if (currentLength === maxShipsLength) {
                        // eslint-disable-next-line @typescript-eslint/no-loop-func
                        const index: number = ships.findIndex(ship => ship === currentLength);
                        ships.splice(index, 1);
                        array = finishBuildingShip(array, temporarilyShipId);
                    }
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-loop-func
                    const index: number = ships.findIndex(ship => ship === currentLength);
                    if (index >= 0) {
                        ships.splice(index, 1);
                        array = finishBuildingShip(array, temporarilyShipId);
                    } else {
                        resetShip(array, temporarilyShipId);
                    }

                    currentLength = 0;
                    addShip(square, currentCellId);
                }
            }
        }
    }

    if (ships.length === 0) {
        for (let i = 0; i < arrayLength; i += 1) {
            for (let j = 0; j < arrayLength; j += 1) {
                const cell = array[i][j];
                if (!cell.ship) {
                    cell.locked = true;
                }
            }
        }
    }

    return array;
};
