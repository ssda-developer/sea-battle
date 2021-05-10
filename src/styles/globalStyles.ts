import { createGlobalStyle } from 'styled-components';

import { IDefaultTheme } from './defaultTheme';

const GlobalStyles = createGlobalStyle<{ theme: IDefaultTheme }>`
    html {
        --color-1--1: ${({ theme }) => theme.colors.color_1__1};
        --color-1--2: ${({ theme }) => theme.colors.color_1__2};
        --color-1--3: ${({ theme }) => theme.colors.color_1__3};
        --color-1--4: ${({ theme }) => theme.colors.color_1__4};
        --color-2--1: ${({ theme }) => theme.colors.color_2__1};
        --color-2--2: ${({ theme }) => theme.colors.color_2__2};
        --color-2--3: ${({ theme }) => theme.colors.color_2__3};
        --color-2--4: ${({ theme }) => theme.colors.color_2__4};
        --color-3--1: ${({ theme }) => theme.colors.color_3__1};
        --color-4--1: ${({ theme }) => theme.colors.color_4__1};
        --color-white: ${({ theme }) => theme.colors.color_white};
        --color-black: ${({ theme }) => theme.colors.color_black};
        --global-field-size: ${({ theme }) => theme.sizes.field_size};
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        margin: 0;
        -moz-osx-font-smoothing: grayscale;

        * {
            box-sizing: border-box;
        }
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    button {
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyles;
