import { IField } from '../Field/fieldInterfaces';

export enum Owns {
    Friendly = 'FRIENDLY',
    Enemy = 'ENEMY',
}

export interface IOwns {
    owns: Owns.Enemy | Owns.Friendly;
}

export interface IArea {
    square: Array<Array<IField>>;
    owns: IOwns | null;
}
