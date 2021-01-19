export const HIT = 'HIT';
export const PAST = 'PAST';
export const SHIP = 'SHIP';

interface Hit {
    type: typeof HIT;
}

interface Past {
    type: typeof PAST;
}

interface Ship {
    type: typeof SHIP;
}

export type TemporaryTypes = Hit | Past | Ship;
