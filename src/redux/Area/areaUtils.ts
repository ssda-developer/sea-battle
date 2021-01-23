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

const finishBuildingShip = (square: Array<Array<IField>>, shipId: string) => {
    console.log('finishBuildingShip');
    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.shipId === shipId) {
                console.log(cell);

                const shiftUp = i - 1;
                const shiftRight = j + 1;
                const shiftDown = i + 1;
                const shiftLeft = j - 1;

                // For non-diagonal.
                const cellUp = shiftUp >= 0 ? newSquare[shiftUp][j] : null;
                const cellRight = shiftRight < newSquareLength ? newSquare[i][shiftRight] : null;
                const cellDown = shiftDown < newSquareLength ? newSquare[shiftDown][j] : null;
                const cellLeft = shiftLeft >= 0 ? newSquare[i][shiftLeft] : null;

                if (cellUp && !cellUp.ship) {
                    cellUp.locked = true;
                }
                if (cellRight && !cellRight.ship) {
                    cellRight.locked = true;
                }
                if (cellDown && !cellDown.ship) {
                    cellDown.locked = true;
                }
                if (cellLeft && !cellLeft.ship) {
                    cellLeft.locked = true;
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
    console.log('resetShip');

    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.shipId === shipId || cell.lockedId === `locked-${shipId}`) {
                console.log(cell);
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
    console.log(firstClick);
    let newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.id === cellId) {
                const shiftUp = i - 1;
                const shiftRight = j + 1;
                const shiftDown = i + 1;
                const shiftLeft = j - 1;

                // For the diagonal
                const cellUpLeft = shiftUp >= 0 && shiftLeft >= 0 ? newSquare[shiftUp][shiftLeft] : null;
                const cellUpRight = shiftUp >= 0 && shiftRight < newSquareLength ? newSquare[shiftUp][shiftRight] : null;
                const cellDownLeft = shiftDown < newSquareLength && shiftLeft >= 0 ? newSquare[shiftDown][shiftLeft] : null;
                const cellDownRight = shiftDown < newSquareLength && shiftRight < newSquareLength ? newSquare[shiftDown][shiftRight] : null;

                // For non-diagonal.
                const cellUp = shiftUp >= 0 ? newSquare[shiftUp][j] : null;
                const cellRight = shiftRight < newSquareLength ? newSquare[i][shiftRight] : null;
                const cellDown = shiftDown < newSquareLength ? newSquare[shiftDown][j] : null;
                const cellLeft = shiftLeft >= 0 ? newSquare[i][shiftLeft] : null;

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
