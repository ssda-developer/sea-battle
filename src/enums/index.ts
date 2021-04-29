enum HintOptions {
    PlaceShips = 'Разместите корабли',
    PlaceShipsRandomly = 'Разместить корабли случайным образом',
    ClearPlayingField = 'Очистить игровое поле',
    ShotAfterHitting = 'Поздравляем! Вы попали. Ваш выстрел.',
    PlayerShot = 'Ваш ход',
    ComputerShot = 'Ход компьютера',
}

enum ShipDirection {
    Horizontal = 'HORIZONTAL',
    Vertical = 'VERTICAL',
}

enum CellDirection {
    Diagonal = 'DIAGONAL',
    NonDiagonal = 'NON-DIAGONAL',
}

export { HintOptions, ShipDirection, CellDirection };
