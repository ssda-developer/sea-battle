export const CHANGE_FIELD_HIT = 'CHANGE_FIELD_HIT';
export const CHANGE_FIELD_PAST = 'CHANGE_FIELD_PAST';
export const CHANGE_FIELD_SHIP = 'CHANGE_FIELD_SHIP';

export type ChangeHit = {
    type: typeof CHANGE_FIELD_HIT;
    payload: boolean;
};

type ChangePast = {
    type: typeof CHANGE_FIELD_PAST;
    payload: boolean;
};

type ChangeShip = {
    type: typeof CHANGE_FIELD_SHIP;
    payload: boolean;
};

export type FieldDispatchTypes = ChangeHit | ChangePast | ChangeShip;
