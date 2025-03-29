import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, ThemeProvider } from './context/ThemeContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => (
  <ThemeProvider>
    <AppWithTheme />
  </ThemeProvider>
);

const AppWithTheme = () => {
  const { theme } = useTheme();

  return (
    <>
    <StatusBar 
      backgroundColor={theme.colors.statusBar}
    />
    <NavigationContainer theme={theme || DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
    </>
  );
};

export default App;
