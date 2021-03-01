import { MouseEvent } from 'react';

export interface IField {
    id: string;
    ship: boolean;
    shipId: string;
    hit: boolean;
    past: boolean;
    locked: boolean;
    lockedId: string;
    explode?: boolean;
    updateCellHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
}
