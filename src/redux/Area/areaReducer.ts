import { RENDER_SQUARE, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IArea } from './areaInterfaces';

const initialState: IArea = {
    square: [],
    owns: null,
};

const areaReducer = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case RENDER_SQUARE:
            return { ...state, square: action.payload };
        case CHANGE_OWNS:
            return { ...state, owns: action.payload };
        default:
            return state;
    }
};

export default areaReducer;
