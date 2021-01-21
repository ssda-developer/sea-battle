import { IField } from './fieldInterfaces';
import { CHANGE_FIELD_HIT, CHANGE_FIELD_PAST, CHANGE_FIELD_SHIP, FieldDispatchTypes } from './fieldTypes';

const initialState: IField = {
    id: '',
    ship: false,
    hit: false,
    past: false,
};

const fieldReducer = (state: IField = initialState, action: FieldDispatchTypes): IField => {
    switch (action.type) {
        case CHANGE_FIELD_HIT:
            return { ...state, hit: action.payload };
        case CHANGE_FIELD_PAST:
            return { ...state, past: action.payload };
        case CHANGE_FIELD_SHIP:
            return { ...state, ship: action.payload };
        default:
            return state;
    }
};

export default fieldReducer;
