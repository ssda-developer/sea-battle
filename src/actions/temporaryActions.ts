import { HIT, PAST, TemporaryTypes } from './temporaryActionTypes';

export const messageHit = (): TemporaryTypes => ({
    type: HIT,
});

export const messagePast = (): TemporaryTypes => ({
    type: PAST,
});
