import {
    RENDER_USER_SQUARE,
    RENDER_COMPUTER_SQUARE,
    CHANGE_OWNS,
    CHANGE_USER_SQUARE_COMPLETE,
    CHANGE_COMPUTER_SQUARE_COMPLETE,
    AreaDispatchTypes,
} from './types';
import { IField } from '../field/interfaces';
import { Owners } from './interfaces';

export const RenderUserSquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_USER_SQUARE,
        payload: square,
    };
};

export const RenderComputerSquare = (square: IField[][]): AreaDispatchTypes => {
    return {
        type: RENDER_COMPUTER_SQUARE,
        payload: square,
    };
};

export const changeOwns = (owner: Owners): AreaDispatchTypes => {
    return {
        type: CHANGE_OWNS,
        payload: owner,
    };
};

export const changeUserSquareComplete = (complete: boolean): AreaDispatchTypes => {
    return {
        type: CHANGE_USER_SQUARE_COMPLETE,
        payload: complete,
    };
};

export const changeComputerSquareComplete = (complete: boolean): AreaDispatchTypes => {
    return {
        type: CHANGE_COMPUTER_SQUARE_COMPLETE,
        payload: complete,
    };
};
