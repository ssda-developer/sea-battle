import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './RootReducer';

export type RootStore = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
