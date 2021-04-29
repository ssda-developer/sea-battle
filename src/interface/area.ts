import { IField } from './field';

export enum Owners {
    User = 'USER',
    Computer = 'COMPUTER',
}

export interface IArea {
    user: {
        userSquare: IField[][];
        userComplete: boolean;
        userShips: number[];
    };
    computer: {
        computerSquare: IField[][];
        computerShips: number[];
    };
}
