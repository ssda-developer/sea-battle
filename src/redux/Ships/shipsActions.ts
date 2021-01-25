import { Dispatch } from 'redux';

import { ShipsDispatchTypes, RENDER_SHIPS, UPDATE_CURRENT_SHIP_ID } from './shipsTypes';

export const renderShips = () => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: RENDER_SHIPS,
    });
};

export const updateCurrentShipId = (id: string) => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: UPDATE_CURRENT_SHIP_ID,
        payload: id,
    });
};
