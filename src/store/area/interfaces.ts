import { IField } from '../field/interfaces';

export enum Owners {
    User = 'USER',
    Computer = 'COMPUTER',
}

export type Squares = {
    userSquare: IField[][];
    computerSquare: IField[][];
};

export interface IArea {
    squares: Squares;
    owner: Owners | null;
}
