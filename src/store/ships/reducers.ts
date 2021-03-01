import { IShips } from './interfaces';
import { RENDER_SHIPS, GET_CURRENT_SHIP_ID, GET_CURRENT_SHIP_LENGTH, ShipsDispatchTypes } from './types';

const initialState: IShips = {
    ships: [],
    currentShip: {
        id: '',
        length: 0,
    },
};

const reducers = (state: IShips = initialState, action: ShipsDispatchTypes): IShips => {
    switch (action.type) {
        case RENDER_SHIPS:
            return {
                ...state,
                ships: action.payload,
            };
        case GET_CURRENT_SHIP_ID:
            return {
                ...state,
                currentShip: {
                    ...state.currentShip,
                    id: action.payload,
                },
            };
        case GET_CURRENT_SHIP_LENGTH:
            return {
                ...state,
                currentShip: {
                    ...state.currentShip,
                    length: action.payload,
                },
            };
        default:
            return state;
    }
};

export default reducers;
