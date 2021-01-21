import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const CHANGE_SQUARE = 'CHANGE_SQUARE';
export const CHANGE_SQUARE_CELL = 'CHANGE_SQUARE_CELL';
export const CHANGE_OWNS = 'CHANGE_OWNS';

export type ChangeSquare = {
    type: typeof CHANGE_SQUARE;
    payload: Array<IField>;
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: IOwns;
};

export type ChangeSquareCell = {
    type: typeof CHANGE_SQUARE_CELL;
    payload: any[];
};

export type AreaDispatchTypes = ChangeSquare | ChangeOwns | ChangeSquareCell;
