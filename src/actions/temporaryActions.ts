import { Dispatch } from 'redux';
import { HIT, PAST, TemporaryDispatchTypes } from './temporaryActionTypes';

export const messageHit = () => (dispatch: Dispatch<TemporaryDispatchTypes>): void => {
    dispatch({
        type: HIT,
    });
};

export const messagePast = () => (dispatch: Dispatch<TemporaryDispatchTypes>): void => {
    dispatch({
        type: PAST,
    });
};
