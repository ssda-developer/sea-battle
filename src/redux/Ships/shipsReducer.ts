import { IShips } from './shipsInterfaces';
import { RENDER_SHIPS, ShipsDispatchTypes } from './shipsTypes';

const initialState: IShips = {
    ships: [],
};

const shipsReducer = (state: IShips = initialState, action: ShipsDispatchTypes): IShips => {
    switch (action.type) {
        case RENDER_SHIPS:
            return state;
        default:
            return state;
    }
};

export default shipsReducer;
