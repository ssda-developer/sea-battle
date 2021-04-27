import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_OWNS,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_COMPUTER_SQUARE_COMPLETE,
    AreaDispatchTypes,
} from './types';
import { IArea } from './interfaces';

const initialState: IArea = {
    squares: {
        user: {
            userSquare: [],
            complete: false,
        },
        computer: {
            computerSquare: [],
            complete: false,
        },
    },
    owner: null,
};

const reducers = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_USER_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    user: {
                        ...state.squares.user,
                        userSquare: action.payload,
                    },
                },
            };
        case RENDER_COMPUTER_SQUARE:
            return {
                ...state,
                squares: {
                    ...state.squares,
                    computer: {
                        ...state.squares.computer,
                        computerSquare: action.payload,
                    },
                },
            };
        case CHANGE_OWNS:
            return { ...state, owner: action.payload };
        default:
            return state;
    }
};

export default reducers;
