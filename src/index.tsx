import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './store';

import App from './App';

import { defaultTheme } from './styles/defaultTheme';
import NormalizeStyles from './styles/normalizeStyles';
import GlobalStyles from './styles/globalStyles';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={defaultTheme}>
                <NormalizeStyles />
                <GlobalStyles />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
