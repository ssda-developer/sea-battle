export interface IShip {
    name: string;
    maxCount: number;
    length: number;
}

export type CurrentShip = {
    id: string;
    length: number;
};

export interface IShips {
    ships: Array<IShip>;
    currentShip: CurrentShip;
}
