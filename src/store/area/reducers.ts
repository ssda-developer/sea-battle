import { RENDER_FRIENDLY_SQUARE, RENDER_ENEMY_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './types';
import { IArea } from './interfaces';

const initialState: IArea = {
    squares: {
        userSquare: [],
        computerSquare: [],
    },
    owner: null,
};

const reducers = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_FRIENDLY_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    userSquare: action.payload,
                },
            };
        case RENDER_ENEMY_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    computerSquare: action.payload,
                },
            };
        case CHANGE_OWNS:
            return { ...state, owner: action.payload };
        default:
            return state;
    }
};

export default reducers;
