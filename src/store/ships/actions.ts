import { ShipsDispatchTypes, RENDER_SHIPS, GET_CURRENT_SHIP_ID, GET_CURRENT_SHIP_LENGTH } from './types';
import { IShip } from './interfaces';

export const renderShips = (ships: Array<Array<IShip>>): ShipsDispatchTypes => {
    return {
        type: RENDER_SHIPS,
        payload: ships,
    };
};

export const getCurrentShipId = (id: string): ShipsDispatchTypes => {
    return {
        type: GET_CURRENT_SHIP_ID,
        payload: id,
    };
};

export const getCurrentShipLength = (length: number): ShipsDispatchTypes => {
    return {
        type: GET_CURRENT_SHIP_LENGTH,
        payload: length,
    };
};
