import { IShips } from './shipsInterfaces';
import { RENDER_SHIPS, UPDATE_CURRENT_SHIP_ID, ShipsDispatchTypes } from './shipsTypes';

const initialState: IShips = {
    ships: [],
    currentShipId: '',
};

const shipsReducer = (state: IShips = initialState, action: ShipsDispatchTypes): IShips => {
    switch (action.type) {
        case RENDER_SHIPS:
            return state;
        case UPDATE_CURRENT_SHIP_ID:
            return { ...state, currentShipId: action.payload };
        default:
            return state;
    }
};

export default shipsReducer;
