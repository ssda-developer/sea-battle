import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './types';
import { IField } from '../field/interfaces';
import { Owners } from './interfaces';

export const renderFriendlySquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_FRIENDLY_SQUARE,
        payload: square,
    };
};

export const renderEnemySquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_ENEMY_SQUARE,
        payload: square,
    };
};

export const changeOwns = (owner: Owners): AreaDispatchTypes => {
    return {
        type: CHANGE_OWNS,
        payload: owner,
    };
};
