export enum HintOptions {
    PlaceShips = 'Разместите корабли',
    PlaceShipsRandomly = 'Разместить корабли случайным образом',
    ClearPlayingField = 'Очистить игровое поле',
    ShotAfterHitting = 'Поздравляем! Вы попали. Ваш выстрел.',
    PlayerShot = 'Ваш ход',
    ComputerShot = 'Ход компьютера',
}

export enum Owners {
    User = 'USER',
    Computer = 'COMPUTER',
}

export enum ShipDirection {
    Horizontal = 'HORIZONTAL',
    Vertical = 'VERTICAL',
}

export enum CellDirection {
    Diagonal = 'DIAGONAL',
    NonDiagonal = 'NON-DIAGONAL',
}
