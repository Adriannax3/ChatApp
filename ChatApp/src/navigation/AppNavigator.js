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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoggedInTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="MyAccount" 
        component={MyAccountScreen} 
        options={{ 
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Text>
          //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg> 

          //   </Text>
          // )
        }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen} 
        options={{ 
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <FontAwesome name="user" size={size} color={color} />
          // )
        }}
      />
      <Tab.Screen 
      name="Ustawienia" 
      component={SettingsAppScreen} 
      options={{ 
        headerShown: false,
//        tabBarIcon: ({ color, size }) => (
//          <FontAwesome name="user" size={size} color={color} />
//        ),
      }}/>
      <Tab.Screen 
      name="SearchFriends"
      component={SearchFriends}
      options={{
        headerShown: false,
      }}
      />
       <Tab.Screen 
        name="Invitations" 
        component={HomeScreen} 
        options={{ 
          headerShown: false,
          // tabBarIcon: ({ color, size }) => (
          //   <Text>
          //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path> <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path> </svg> 

          //   </Text>
          // )
        }}
      />
    </Tab.Navigator>
    
  );
};

const AppNavigator = () => {
  const { user } = useAuth();

  if (user) {
    return <LoggedInTabs />;
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
