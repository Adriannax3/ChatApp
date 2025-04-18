import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, ThemeProvider } from './context/ThemeContext';
import { useAuth, AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider>
      <AuthProvider>
        <AppWithTheme />
      </AuthProvider>
    </ThemeProvider>
  </GestureHandlerRootView>
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
