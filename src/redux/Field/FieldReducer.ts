import { IField } from './FieldInterface';
import { CHANGE_FIELD_HIT, CHANGE_FIELD_PAST, CHANGE_FIELD_SHIP, FieldDispatchTypes } from './FieldTypes';

const initialState: IField = {
    name: '',
    ship: false,
    hit: false,
    past: false,
};

const fieldReducer = (state: IField = initialState, action: FieldDispatchTypes) => {
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
