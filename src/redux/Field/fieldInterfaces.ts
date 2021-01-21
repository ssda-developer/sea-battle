import { MouseEvent } from 'react';

export interface IField {
    id: string;
    ship: boolean;
    hit: boolean;
    past: boolean;
    onChangeField?: (event: MouseEvent<HTMLButtonElement>) => void;
}
