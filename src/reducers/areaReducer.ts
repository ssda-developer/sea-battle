import { CHANGE_SQUARE, AreaDispatchTypes, ISquare } from '../actions/areaActionsTypes';

export interface IOwns {
    owns: 'friendly' | 'enemy';
}

export interface IArea {
    square: ISquare[];
    owns: IOwns | null;
}

const initialState: IArea = {
    square: [],
    owns: null,
};

export const areaReducer = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case CHANGE_SQUARE:
            return { ...state, square: action.payload };
        default:
            return state;
    }
};
