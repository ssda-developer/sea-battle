export interface ISquare {
    name: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
}

export const CHANGE_SQUARE = 'CHANGE_SQUARE';

export type ChangeSquare = {
    type: typeof CHANGE_SQUARE;
    payload: ISquare[];
};

export type AreaDispatchTypes = ChangeSquare;
