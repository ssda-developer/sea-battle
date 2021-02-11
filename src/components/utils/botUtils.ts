import { IField } from '../../redux/Field/fieldInterfaces';

const buildRandomShips = (square: Array<Array<IField>>): Array<Array<IField>> => {
    const { length } = square;
    const startX = Math.floor(Math.random() * length);
    const startY = Math.floor(Math.random() * length);

    const startingPoint = square[startY][startX];

    if (startX + 4 < length) {
        console.log(startX);
    } else {
        console.log(111);
    }

    console.log(startingPoint);
    return square;
};

export default buildRandomShips;
