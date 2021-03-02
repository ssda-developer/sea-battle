import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CLEAR_FRIENDLY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './types';
import { IField } from '../field/interfaces';
import { IOwns } from './interfaces';

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

export const clearFriendlySquare = (): AreaDispatchTypes => {
    return {
        type: CLEAR_FRIENDLY_SQUARE,
    };
};

export const changeOwns = (owns: IOwns): AreaDispatchTypes => {
    return {
        type: CHANGE_OWNS,
        payload: owns,
    };
};
