export const RENDER_SHIPS = 'RENDER_SHIPS';
export const GET_CURRENT_SHIP_ID = 'GET_CURRENT_SHIP_ID';
export const GET_CURRENT_SHIP_LENGTH = 'GET_CURRENT_SHIP_LENGTH';

export type RenderShips = {
    type: typeof RENDER_SHIPS;
};

export type GetCurrentShipId = {
    type: typeof GET_CURRENT_SHIP_ID;
    payload: string;
};

export type GetCurrentShipLength = {
    type: typeof GET_CURRENT_SHIP_LENGTH;
    payload: number;
};

export type ShipsDispatchTypes = RenderShips | GetCurrentShipId | GetCurrentShipLength;
