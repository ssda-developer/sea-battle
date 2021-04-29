import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import rootReducer from './reducers';

export type RootStore = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, {}, devToolsEnhancer({}));
