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

// let oldCoordI = 0;
// let oldCoordJ = 0;

const createShip = (square: Array<Array<IField>>, i: number, j: number): Array<Array<IField>> => {
    console.log('createShip', i, j);
    // oldCoordI = i;
    // oldCoordJ = j;

    const temporarilyMaxLength = 4;
    const newSquare = square;
    const newSquareLength = square.length;
    const oldSquare = square;

    const shiftUp = i - 1;
    const shiftRight = j + 1;
    const shiftDown = i + 1;
    const shiftLeft = j - 1;

    // console.log(`shiftUp: ${shiftUp}`);
    // console.log(`shiftRight: ${shiftRight}`);
    // console.log(`shiftDown: ${shiftDown}`);
    // console.log(`shiftLeft: ${shiftLeft}`);

    const cellUpLeft = shiftUp >= 0 && shiftLeft >= 0 ? newSquare[shiftUp][shiftLeft] : null;
    const cellUpRight = shiftUp >= 0 && shiftRight < newSquareLength ? newSquare[shiftUp][shiftRight] : null;
    const cellDownLeft = shiftDown < newSquareLength && shiftLeft >= 0 ? newSquare[shiftDown][shiftLeft] : null;
    const cellDownRight = shiftDown < newSquareLength && shiftRight < newSquareLength ? newSquare[shiftDown][shiftRight] : null;

    if (cellUpLeft && !cellUpLeft.ship) {
        cellUpLeft.locked = true;
    }
    if (cellDownLeft && !cellDownLeft.ship) {
        cellDownLeft.locked = true;
    }
    if (cellUpRight && !cellUpRight.ship) {
        cellUpRight.locked = true;
    }
    if (cellDownRight && !cellDownRight.ship) {
        cellDownRight.locked = true;
    }

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
                cell.ship = true;
                newSquare = createShip(newSquare, i, j);
            }
        }
    }

    return newSquare;
};
