import { IField } from '../field/interfaces';

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
        computerComplete: boolean;
        computerShips: number[];
    };
}
