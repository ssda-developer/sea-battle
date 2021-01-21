import { Dispatch } from 'redux';
import { CHANGE_FIELD_HIT, CHANGE_FIELD_PAST, CHANGE_FIELD_SHIP, FieldDispatchTypes } from './fieldTypes';

export const changeHit = (hit: boolean) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_HIT,
        payload: hit,
    });
};

export const changePast = (past: boolean) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_PAST,
        payload: past,
    });
};

export const changeShip = (ship: boolean) => (dispatch: Dispatch<FieldDispatchTypes>): void => {
    dispatch({
        type: CHANGE_FIELD_SHIP,
        payload: ship,
    });
};
