import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const RENDER_SQUARE = 'RENDER_SQUARE';
export const CHANGE_OWNS = 'CHANGE_OWNS';

export type RenderSquare = {
    type: typeof RENDER_SQUARE;
    payload: Array<Array<IField>>;
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: IOwns;
};

export type AreaDispatchTypes = RenderSquare | ChangeOwns;
