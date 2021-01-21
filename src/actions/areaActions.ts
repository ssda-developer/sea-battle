import { Dispatch } from 'redux';
import { CHANGE_SQUARE, AreaDispatchTypes, ISquare } from './areaActionsTypes';

const ChangeSquare = (square: ISquare[]) => (dispatch: Dispatch<AreaDispatchTypes>): void => {
    dispatch({
        type: CHANGE_SQUARE,
        payload: square,
    });
};

export default ChangeSquare;
