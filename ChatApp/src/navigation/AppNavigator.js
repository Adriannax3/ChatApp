import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsAppScreen from '../screens/SettingsAppScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import FriendsScreen from '../screens/FriendsScreen';
import { useAuth } from '../context/AuthContext';
import SearchFriends from '../components/SearchFriends';
import HomeScreen from '../components/HomeScreen';
import InvitationsScreen from '../components/InvitationsScreen';
import ChatScreen from '../screens/ChatScreen';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="MyAccount" 
        component={MyAccountScreen} 
        options={{ 
          headerShown: false,
           tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen} 
        options={{ 
          headerShown: false,
           tabBarIcon: ({ color, size }) => (
              <Icon name="users" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen 
      name="Ustawienia" 
      component={SettingsAppScreen} 
      options={{ 
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Icon name="settings" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
    
  );
};

const AppNavigator = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={LoggedInTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: `Czatujesz z ${route.params?.friend?.username}` || 'Czat',
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="SearchFriends"
          component={SearchFriends}
          options={{
            title: 'Wyszukaj znajomych',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="Invitations"
          component={InvitationsScreen}
          options={{
            title: 'Oczekujące zaproszenia',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SettingsApp" component={SettingsAppScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
