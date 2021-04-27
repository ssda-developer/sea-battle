import { IField } from '../field/interfaces';

export enum Owners {
    User = 'USER',
    Computer = 'COMPUTER',
}

export type Squares = {
    user: {
        userSquare: IField[][];
        complete: boolean;
    };
    computer: {
        computerSquare: IField[][];
        complete: boolean;
    };
};

export interface IArea {
    squares: Squares;
    owner: Owners | null;
}
