export interface IShip {
    id: string;
    length: number;
}

export type CurrentShip = {
    id: string;
    length: number;
};

export interface IShips {
    ships: Array<Array<IShip>>;
    currentShip: CurrentShip;
}
