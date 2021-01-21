import { CHANGE_SQUARE, CHANGE_SQUARE_CELL, CHANGE_OWNS, AreaDispatchTypes } from './areaTypes';
import { IArea } from './areaInterfaces';
import changeSquareCell from './areaUtils';

const initialState: IArea = {
    square: [],
    owns: null,
};

const areaReducer = (state: IArea = initialState, action: AreaDispatchTypes): IArea => {
    switch (action.type) {
        case CHANGE_SQUARE:
            return { ...state, square: action.payload };
        case CHANGE_SQUARE_CELL:
            return { ...state, square: changeSquareCell(action.payload) };
        case CHANGE_OWNS:
            return { ...state, owns: action.payload };
        default:
            return state;
    }
};

export default areaReducer;
