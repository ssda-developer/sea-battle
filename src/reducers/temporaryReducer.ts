import { TemporaryDispatchTypes } from '../actions/temporaryActionTypes';

export interface IState {
    readonly numbers: string[];
    readonly letters: string[];
}

const initialState: IState = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
};

export const temporaryReducer = (state: IState = initialState, action: TemporaryDispatchTypes): IState => {
    switch (action.type) {
        default:
            return state;
    }
};
