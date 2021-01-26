import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IArea } from './areaInterfaces';

const initialState: IArea = {
    squares: {
        friendlySquare: [],
        enemySquare: [],
    },
    owns: null,
};

const areaReducer = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_FRIENDLY_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    friendlySquare: action.payload,
                },
            };
        case RENDER_ENEMY_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    enemySquare: action.payload,
                },
            };
        case CHANGE_OWNS:
            return { ...state, owns: action.payload };
        default:
            return state;
    }
};

export default areaReducer;
