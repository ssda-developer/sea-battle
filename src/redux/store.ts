import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

export type RootStore = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
