import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const RENDER_FRIENDLY_SQUARE = 'RENDER_FRIENDLY_SQUARE';
export const RENDER_ENEMY_SQUARE = 'RENDER_ENEMY_SQUARE';
export const CHANGE_OWNS = 'CHANGE_OWNS';

export type RenderFriendlySquare = {
    type: typeof RENDER_FRIENDLY_SQUARE;
    payload: Array<Array<IField>>;
};

export type RenderEnemySquare = {
    type: typeof RENDER_ENEMY_SQUARE;
    payload: Array<Array<IField>>;
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: IOwns;
};

export type AreaDispatchTypes = RenderFriendlySquare | RenderEnemySquare | ChangeOwns;
