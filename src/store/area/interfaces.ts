import { IField } from '../field/interfaces';

export enum Owners {
    User = 'USER',
    Computer = 'COMPUTER',
    Nobody = 'NOBODY',
}

export type Squares = {
    userSquare: IField[][];
    computerSquare: IField[][];
};

export interface IArea {
    squares: Squares;
    owner: Owners;
}
