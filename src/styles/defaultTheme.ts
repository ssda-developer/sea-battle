export interface IDefaultTheme {
    colors: {
        color_1__1: string;
        color_1__2: string;
        color_1__3: string;
        color_1__4: string;
        color_2__1: string;
        color_2__2: string;
        color_2__3: string;
        color_2__4: string;
        color_3__1: string;
        color_4__1: string;
        color_white: string;
        color_black: string;
    };
    sizes: {
        field_size: string;
    };
}

export const defaultTheme: IDefaultTheme = {
    colors: {
        color_1__1: '#bbe1fa',
        color_1__2: '#3282b8',
        color_1__3: '#0f4c75',
        color_1__4: '#1b262c',
        color_2__1: '#ffcf92',
        color_2__2: '#ffbe6b',
        color_2__3: '#ffa83a',
        color_2__4: '#a66513',
        color_3__1: '#f93c1e',
        color_4__1: '#277b1e',
        color_white: '#fff',
        color_black: '#000',
    },
    sizes: {
        field_size: '50px',
    },
};
