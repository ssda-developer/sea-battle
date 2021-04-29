import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Game from './Game';

import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Game />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
