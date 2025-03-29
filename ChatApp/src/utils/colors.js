import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  name: 'light',
  colors: {
    ...DefaultTheme.colors,
    color: '#000',
    primary: '#d0e8ff',
    background: '#f2e6f7',
    text: '#000000',
    statusBar: '#cce5e5',
    backgroundButton: '#000',
  },
};

export const darkTheme = {
  ...DarkTheme,
  name: 'dark',
  colors: {
    ...DarkTheme.colors,
    color: '#fff',
    primary: '#007aff',
    background: '#000000',
    text: '#ffffff',
    statusBar: '#000',
    backgroundButton: '#808080',
  },
};

