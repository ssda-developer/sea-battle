import { Dispatch } from 'redux';

import { ShipsDispatchTypes, RENDER_SHIPS, GET_CURRENT_SHIP_ID, GET_CURRENT_SHIP_LENGTH } from './shipsTypes';
import { IShip } from './shipsInterfaces';

export const renderShips = (ships: Array<Array<IShip>>) => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: RENDER_SHIPS,
        payload: ships,
    });
};

export const getCurrentShipId = (id: string) => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: GET_CURRENT_SHIP_ID,
        payload: id,
    });
};

export const getCurrentShipLength = (length: number) => (dispatch: Dispatch<ShipsDispatchTypes>): void => {
    dispatch({
        type: GET_CURRENT_SHIP_LENGTH,
        payload: length,
    });
};
