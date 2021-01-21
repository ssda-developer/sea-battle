import { IField } from '../Field/fieldInterfaces';

export interface IOwns {
    owns: 'friendly' | 'enemy';
}

export interface IArea {
    square: Array<IField>;
    owns: IOwns | null;
}
