import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  name: 'light',
  colors: {
    ...DefaultTheme.colors,
    color: '#000',
    primary: '#a1eafb',
    background: '#ffcef3',
    text: '#000000',
    statusBar: '#ffcef3',
    backgroundButton: '#cabbe9',
    error: '#ff0000'
  },
};

export const darkTheme = {
  ...DarkTheme,
  name: 'dark',
  colors: {
    ...DarkTheme.colors,
    color: '#fff',
    primary: '#3d6cb9',
    background: '#000000',
    text: '#ffffff',
    statusBar: '#000',
    backgroundButton: '#808080',
    error: '#ff0000'
  },
};

