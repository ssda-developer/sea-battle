import { createStore, applyMiddleware, Store } from 'redux';
import { reducer } from './store/reducer';

const store = createStore(reducer);

export default store;
