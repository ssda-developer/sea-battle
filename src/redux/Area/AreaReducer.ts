import { CHANGE_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './AreaTypes';
import { IArea } from './AreaInterface';

const initialState: IArea = {
    square: [],
    owns: null,
};

const areaReducer = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case CHANGE_SQUARE:
            return { ...state, square: action.payload };
        case CHANGE_OWNS:
            return { ...state, owns: action.payload };
        default:
            return state;
    }
};

export default areaReducer;
