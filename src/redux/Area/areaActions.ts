import { Dispatch } from 'redux';
import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const renderFriendlySquare = (square: IField[][]) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: RENDER_FRIENDLY_SQUARE,
        payload: square,
    });
};

export const renderEnemySquare = (square: IField[][]) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: RENDER_ENEMY_SQUARE,
        payload: square,
    });
};

export const changeOwns = (owns: IOwns) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_OWNS,
        payload: owns,
    });
};
