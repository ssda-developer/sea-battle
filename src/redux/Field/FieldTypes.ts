import { IField } from './FieldInterface';

export const CHANGE_FIELD_HIT = 'CHANGE_FIELD_HIT';
export const CHANGE_FIELD_PAST = 'CHANGE_FIELD_PAST';
export const CHANGE_FIELD_SHIP = 'CHANGE_FIELD_SHIP';

export type ChangeHit = {
    type: typeof CHANGE_FIELD_HIT;
    payload: IField;
};

type ChangePast = {
    type: typeof CHANGE_FIELD_PAST;
    payload: IField;
};

type ChangeShip = {
    type: typeof CHANGE_FIELD_SHIP;
    payload: IField;
};

export type FieldDispatchTypes = ChangeHit | ChangePast | ChangeShip;
