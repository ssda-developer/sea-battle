import { Dispatch } from 'redux';
import { RENDER_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const renderSquare = (square: Array<Array<IField>>) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: RENDER_SQUARE,
        payload: square,
    });
};

export const changeOwns = (owns: IOwns) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_OWNS,
        payload: owns,
    });
};
