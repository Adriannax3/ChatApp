import React from "react";
import { SafeAreaView, Text, StyleSheet, Image, ScrollView, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../context/AuthContext";
import ButtonRectangle from "../components/ButtonRectangle";

export default function MyAccountScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Ładowanie danych użytkownika...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
      <View style={styles.card}>
        <Text style={styles.avatar}>{user.avatar}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.login}>@{user.login}</Text>
        <Text>Ilość znajomych: X</Text>
        <View>
          <ButtonRectangle text={'Wyloguj się'} onPress={() => logout(navigation)} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    fontSize: 80,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  login: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
});
