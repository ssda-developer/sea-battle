export const SHIPS: readonly number[] = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

export enum ShipDirection {
    Horizontal = 'HORIZONTAL',
    Vertical = 'VERTICAL',
}

export enum CellDirection {
    Diagonal = 'DIAGONAL',
    NonDiagonal = 'NON-DIAGONAL',
}
