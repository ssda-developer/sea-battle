import { combineReducers } from 'redux';
import { temporaryReducer } from './temporaryReducer';

const rootReducer = combineReducers({
    temporaryReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
