export const HIT = 'HIT';
export const PAST = 'PAST';
export const SHIP = 'SHIP';

export type Hit = {
    type: typeof HIT;
};

type Past = {
    type: typeof PAST;
};

type Ship = {
    type: typeof SHIP;
};

export type TemporaryDispatchTypes = Hit | Past | Ship;
