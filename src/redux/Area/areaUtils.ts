import { IField } from '../Field/fieldInterfaces';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

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

export const updateCell = (square: Array<Array<IField>>, cellId: string): Array<Array<IField>> => {
    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            if (newSquare[i][j].id === cellId) {
                newSquare[i][j].past = true;
            }
        }
    }

    return newSquare;
};

let firstClick = true;
let temporarilyMaxLength = 4;
let temporarilyShipId = 'fourdeck1';

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
    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.shipId === shipId) {
                const { cellUp, cellRight, cellDown, cellLeft } = getNonDiagonalCell(newSquare, i, j);

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
    temporarilyMaxLength = 4;
    temporarilyShipId = `random-${Math.floor(Math.random() * Math.floor(50))}`;

    return newSquare;
};

const resetShip = (square: Array<Array<IField>>, shipId: string) => {
    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

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

    return newSquare;
};

// TODO: need finish this code.
export const addShip = (square: Array<Array<IField>>, cellId: string): Array<Array<IField>> => {
    let newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.id === cellId) {
                const { cellUpLeft, cellUpRight, cellDownLeft, cellDownRight } = getDiagonalCell(newSquare, i, j);
                const { cellUp, cellRight, cellDown, cellLeft } = getNonDiagonalCell(newSquare, i, j);

                if (
                    temporarilyMaxLength > 0 &&
                    ((cellUp && cellUp.shipId === temporarilyShipId) ||
                        (cellRight && cellRight.shipId === temporarilyShipId) ||
                        (cellDown && cellDown.shipId === temporarilyShipId) ||
                        (cellLeft && cellLeft.shipId === temporarilyShipId) ||
                        firstClick)
                ) {
                    if (cellUpLeft && !cellUpLeft.ship) {
                        cellUpLeft.locked = true;
                        if (cellUpLeft.lockedId.length === 0) {
                            cellUpLeft.lockedId = `locked-${temporarilyShipId}`;
                        }
                    }
                    if (cellDownLeft && !cellDownLeft.ship) {
                        cellDownLeft.locked = true;
                        if (cellDownLeft.lockedId.length === 0) {
                            cellDownLeft.lockedId = `locked-${temporarilyShipId}`;
                        }
                    }
                    if (cellUpRight && !cellUpRight.ship) {
                        cellUpRight.locked = true;
                        if (cellUpRight.lockedId.length === 0) {
                            cellUpRight.lockedId = `locked-${temporarilyShipId}`;
                        }
                    }
                    if (cellDownRight && !cellDownRight.ship) {
                        cellDownRight.locked = true;
                        if (cellDownRight.lockedId.length === 0) {
                            cellDownRight.lockedId = `locked-${temporarilyShipId}`;
                        }
                    }

                    cell.ship = true;
                    cell.shipId = temporarilyShipId;
                    firstClick = false;
                    temporarilyMaxLength -= 1;

                    if (temporarilyMaxLength === 0) {
                        newSquare = finishBuildingShip(newSquare, temporarilyShipId);
                    }
                } else {
                    resetShip(newSquare, temporarilyShipId);
                }
            }
        }
    }

    return newSquare;
};
