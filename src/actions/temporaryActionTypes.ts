export const HIT = 'HIT';
export const PAST = 'PAST';
export const SHIP = 'SHIP';

export interface Hit {
    type: typeof HIT;
}

interface Past {
    type: typeof PAST;
}

interface Ship {
    type: typeof SHIP;
}

export type TemporaryDispatchTypes = Hit | Past | Ship;
