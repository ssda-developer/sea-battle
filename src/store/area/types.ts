import { IField } from '../field/interfaces';
import { Owners } from './interfaces';

export const RENDER_FRIENDLY_SQUARE = 'RENDER_FRIENDLY_SQUARE';
export const RENDER_ENEMY_SQUARE = 'RENDER_ENEMY_SQUARE';
export const CHANGE_OWNS = 'CHANGE_OWNS';

export type RenderFriendlySquare = {
    type: typeof RENDER_FRIENDLY_SQUARE;
    payload: IField[][];
};

export type RenderEnemySquare = {
    type: typeof RENDER_ENEMY_SQUARE;
    payload: IField[][];
};

export type ChangeOwns = {
    type: typeof CHANGE_OWNS;
    payload: Owners;
};

export type AreaDispatchTypes = RenderFriendlySquare | RenderEnemySquare | ChangeOwns;
