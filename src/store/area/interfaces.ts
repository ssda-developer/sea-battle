import { IField } from '../field/interfaces';

export enum Owner {
    User = 'USER',
    Computer = 'COMPUTER',
}

export type Squares = {
    userSquare: IField[][];
    computerSquare: IField[][];
};

export interface IOwner {
    owner: Owner.User | Owner.Computer;
}

export interface IArea {
    squares: Squares;
    owner: IOwner | null;
}
