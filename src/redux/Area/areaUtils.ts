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
                hit: false,
                past: false,
                locked: false,
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

// TODO: need finish this code.
export const addShip = (square: Array<Array<IField>>, cellId: string): Array<Array<IField>> => {
    const newSquare = square;
    const newSquareLength = square.length;

    for (let i = 0; i < newSquareLength; i += 1) {
        for (let j = 0; j < newSquareLength; j += 1) {
            const cell = newSquare[i][j];

            if (cell.id === cellId) {
                cell.ship = true;

                // const shiftLeft = i - 1 < 0 ? 0 : i - 1;
                // const shiftUp = j - 1 < 0 ? 0 : j - 1;
                // const shiftRight = i + 1 >= newSquareLength ? i : i + 1;
                // const shiftDown = j + 1 >= newSquareLength ? j : j + 1;

                const shiftUp = i - 1;
                const shiftRight = j + 1;
                const shiftDown = i + 1;
                const shiftLeft = j - 1;

                if (shiftUp >= 0 && shiftRight < newSquareLength && shiftDown < newSquareLength && shiftLeft >= 0) {
                    const cellUpLeft = newSquare[shiftUp][shiftLeft];
                    const cellUpRight = newSquare[shiftUp][shiftRight];
                    const cellDownLeft = newSquare[shiftDown][shiftLeft];
                    const cellDownRight = newSquare[shiftDown][shiftRight];

                    if (!cellUpLeft.ship) {
                        cellUpLeft.locked = true;
                    }
                    if (!cellDownLeft.ship) {
                        cellDownLeft.locked = true;
                    }
                    if (!cellUpRight.ship) {
                        cellUpRight.locked = true;
                    }
                    if (!cellDownRight.ship) {
                        cellDownRight.locked = true;
                    }
                } else {
                    console.log('уходит за границу');
                }

                // newSquare[i - 1][j - 1].locked = true;
                // newSquare[i - 1][j + 1].locked = true;
                // newSquare[i + 1][j + 1].locked = true;
                // newSquare[i + 1][j - 1].locked = true;
            }
        }
    }

    return newSquare;
};
