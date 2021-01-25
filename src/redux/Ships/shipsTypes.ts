export const RENDER_SHIPS = 'RENDER_SHIPS';
export const UPDATE_CURRENT_SHIP_ID = 'UPDATE_CURRENT_SHIP_ID';

export type RenderShips = {
    type: typeof RENDER_SHIPS;
};

export type UpdateCurrentShipId = {
    type: typeof UPDATE_CURRENT_SHIP_ID;
    payload: string;
};

export type ShipsDispatchTypes = RenderShips | UpdateCurrentShipId;
