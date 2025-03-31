import React from "react";
import { SafeAreaView, Text, StyleSheet, Image, ScrollView, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";


export default function MyAccountScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const {user, logout} = useAuth();

  return(
      <View>
        <Text>{user.avatar}</Text>
        <Text>{user.login}</Text>
        <Text>{user.username}</Text>
      </View>
  );
};


const styles = StyleSheet.create({

});
