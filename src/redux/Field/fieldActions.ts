import { Dispatch } from 'redux';
import { CHANGE_FIELD_HIT, CHANGE_FIELD_PAST, CHANGE_FIELD_SHIP, FieldDispatchTypes } from './fieldTypes';
import { IField } from './fieldInterfaces';

export const changeHit = (cell: IField) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_HIT,
        payload: cell,
    });
};

export const changePast = (cell: IField) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_PAST,
        payload: cell,
    });
};

export const changeShip = (cell: IField) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_SHIP,
        payload: cell,
    });
};
