import { IField } from '../Field/fieldInterfaces';

export enum Owns {
    Friendly = 'FRIENDLY',
    Enemy = 'ENEMY',
}

export type Squares = {
    friendlySquare: Array<Array<IField>>;
    enemySquare: Array<Array<IField>>;
};

export interface IOwns {
    owns: Owns.Enemy | Owns.Friendly;
}

export interface IArea {
    squares: Squares;
    owns: IOwns | null;
}
