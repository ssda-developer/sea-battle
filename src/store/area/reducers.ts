import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CLEAR_FRIENDLY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './types';
import { IArea } from './interfaces';

const initialState: IArea = {
    squares: {
        friendlySquare: [],
        enemySquare: [],
    },
    owns: null,
};

const reducers = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
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
        case CLEAR_FRIENDLY_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    friendlySquare: [],
                },
            };
        case CHANGE_OWNS:
            return { ...state, owns: action.payload };
        default:
            return state;
    }
};

export default reducers;
