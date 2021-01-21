import { IField } from '../Field/fieldInterfaces';
import { AREA_LETTERS, AREA_NUMBERS } from '../../constants/areaConstants';

export const updateCell = (square: Array<IField>, cellId: string): Array<IField> => {
    const newSquare = square;

    newSquare.forEach((cell: IField, idx: number) => {
        const { id } = cell;

        if (id === cellId) {
            newSquare[idx].past = true;
        }
    });

    return newSquare;
};

export const createSquare = (): Array<IField> => {
    const square: Array<IField> = [];

    AREA_NUMBERS.forEach(number => {
        AREA_LETTERS.forEach(letter => {
            const cell = {
                id: `${letter}${number}`,
                ship: false,
                hit: false,
                past: false,
            };

            square.push(cell);
        });
    });

    return square;
};
