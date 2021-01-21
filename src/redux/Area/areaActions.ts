import { Dispatch } from 'redux';
import { CHANGE_SQUARE, CHANGE_SQUARE_CELL, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IField } from '../Field/fieldInterfaces';
import { IOwns } from './areaInterfaces';

export const changeSquare = (square: Array<IField>) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_SQUARE,
        payload: square,
    });
};

export const changeOwns = (owns: IOwns) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_OWNS,
        payload: owns,
    });
};

export const changeSquareCell = (square: Array<IField>, id: string) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_SQUARE_CELL,
        payload: [square, id],
    });
};
