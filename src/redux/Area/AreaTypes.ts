import { IField } from '../Field/FieldInterface';
import { IOwns } from './AreaInterface';

export const CHANGE_SQUARE = 'CHANGE_SQUARE';
export const CHANGE_OWNS = 'CHANGE_OWNS';

export type ChangeSquare = {
    type: typeof CHANGE_SQUARE;
    payload: Array<IField>;
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: IOwns;
};

export type AreaDispatchTypes = ChangeSquare | ChangeOwns;
