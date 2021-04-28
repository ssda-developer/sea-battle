import { Owners } from '../area/interfaces';

export interface IGame {
    gameStart: boolean;
    gameOver: boolean;
    currentPlayer: Owners | null;
}

export interface IHints {
    hintText: string;
}
