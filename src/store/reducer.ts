export interface IState {
    numbers: string[];
    letters: string[];
}

const initialState = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
};

type Action = { type: 'HIT' };

export const reducer = (state: IState = initialState, action: Action): IState => {
    switch (action.type) {
        case 'HIT':
            return state;
        default:
            return state;
    }
};
