import { IField } from '../field/interfaces';

export enum Owns {
    Friendly = 'FRIENDLY',
    Enemy = 'ENEMY',
}

export type Squares = {
    friendlySquare: IField[][];
    enemySquare: IField[][];
};

export interface IOwns {
    owns: Owns.Enemy | Owns.Friendly;
}

export interface IArea {
    squares: Squares;
    owns: IOwns | null;
}
