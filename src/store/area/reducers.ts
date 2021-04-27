import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_COMPUTER_SQUARE_COMPLETE,
    CHANGE_USER_SHIPS,
    CHANGE_COMPUTER_SHIPS,
    AreaDispatchTypes,
} from './types';
import { IArea } from './interfaces';

const initialState: IArea = {
    user: {
        userSquare: [],
        userComplete: false,
        userShips: [],
    },
    computer: {
        computerSquare: [],
        computerComplete: false,
        computerShips: [],
    },
};

const reducers = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_USER_SQUARE:
            return {
                ...state,
                user: {
                    ...state.user,
                    userSquare: action.payload,
                },
            };
        case RENDER_COMPUTER_SQUARE:
            return {
                ...state,
                computer: {
                    ...state.computer,
                    computerSquare: action.payload,
                },
            };
        case CHANGE_USER_SHIPS:
            return {
                ...state,
                user: {
                    ...state.user,
                    userShips: action.payload,
                },
            };
        case CHANGE_COMPUTER_SHIPS:
            return {
                ...state,
                computer: {
                    ...state.computer,
                    computerShips: action.payload,
                },
            };
        default:
            return state;
    }
};

export default reducers;
