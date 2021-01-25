export interface IShip {
    name: string;
    maxCount: number;
    length: number;
}

export interface IShips {
    ships: Array<IShip>;
    currentShipId: string;
}
