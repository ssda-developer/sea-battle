import { Dispatch } from 'redux';
import { CHANGE_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const ChangeSquare = (square: Array<IField>) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_SQUARE,
        payload: square,
    });
};

export const ChangeOwns = (owns: IOwns) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_OWNS,
        payload: owns,
    });
};
