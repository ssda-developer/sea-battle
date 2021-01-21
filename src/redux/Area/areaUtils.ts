import { IField } from '../Field/fieldInterfaces';

const changeSquareCell = (field: any) => {
    console.log(field);

    const newSquare = field[0];

    newSquare.forEach((cell: IField, idx: number) => {
        const { id, ship, hit, past } = cell;

        if (id === field[1]) {
            if (cell.ship) {
                newSquare[idx] = { id, ship, hit: true, past };
            } else {
                newSquare[idx] = { id, ship, hit, past: true };
            }
        }
    });

    return newSquare;
};

export default changeSquareCell;
