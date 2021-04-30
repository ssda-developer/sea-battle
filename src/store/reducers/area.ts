import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_USER_SHIPS,
    CHANGE_COMPUTER_SHIPS,
    AreaDispatchTypes,
} from '../types/area';

import { IArea } from '../../interface';

const initialState: IArea = {
    user: {
        userField: [],
        userComplete: false,
        userShips: [],
    },
    computer: {
        computerField: [],
        computerShips: [],
    },
};

const area = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_USER_SQUARE:
            return {
                ...state,
                user: {
                    ...state.user,
                    userField: action.payload,
                },
            };
        case RENDER_COMPUTER_SQUARE:
            return {
                ...state,
                computer: {
                    ...state.computer,
                    computerField: action.payload,
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
        case CHANGE_USER_SQUARE_COMPLETE:
            return {
                ...state,
                user: {
                    ...state.user,
                    userComplete: action.payload,
                },
            };
        default:
            return state;
    }
};

export default area;
