import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsAppScreen from '../screens/SettingsAppScreen';
import AvatarPicker from '../components/AvatarPicker';
import MyAccountScreen from '../screens/MyAccountScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <SafeAreaProvider>
        <Stack.Navigator 
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsApp" component={SettingsAppScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        </Stack.Navigator>
  </SafeAreaProvider>
);

export default AppNavigator;