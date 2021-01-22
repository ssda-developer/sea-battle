import { MouseEvent } from 'react';

export interface IField {
    id: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
    locked: boolean;
    updateCellHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
}
