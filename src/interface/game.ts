import { Owners } from './area';

export interface IGame {
    gameStart: boolean;
    gameOver: boolean;
    currentPlayer: Owners | null;
}

export interface IHints {
    hintText: string;
}
