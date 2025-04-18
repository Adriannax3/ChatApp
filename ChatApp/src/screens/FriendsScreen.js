import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import axios from '../axios';
import { useNavigation } from '@react-navigation/native';
import ButtonRectangle from "../components/ButtonRectangle";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function FriendsScreen() {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const { user, token } = useAuth();

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFriends = async () => {
      try {
          const res = await axios.get(`/friends`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              }
          });
          setFriends(res.data);
          console.log(res.data);
      } catch (err) {
          console.log("Błąd pobierania znajomych:", err);
          setError("Nie udało się pobrać znajomych.");
      } finally {
          setLoading(false);
      }
    };

    useEffect(() => {
        if (user) fetchFriends();
    }, [user]);

    useFocusEffect(
      useCallback(() => {
        fetchFriends(); 
    
        return () => {
        };
      }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {loading ? (
                <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{color: theme.colors.text }} >Ładowanie znajomych...</Text>
                </View>
            ) : error ? (
                <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
                    <Text style={{color: theme.colors.error }}>{error}</Text>
                </View>
            ) : friends.length === 0 ? (
                <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
                    <Text style={{color: theme.colors.error }}>Brak znajomych</Text>
                </View>
            ) : (
                <View>
                <Text style={{color: theme.colors.error }}>Twoi znajomi</Text>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={friends}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <Text style={styles.friendAvatar}>
                              {item.avatar}
                            </Text>
                            <Text style={[styles.friendText, { color: theme.colors.text }]}>
                              {item.username}
                            </Text>
                        </View>
                    )}
                />
                </View>
            )}
          <View>
            <ButtonRectangle text="Zaproś znajomych" onPress={() => navigation.navigate('SearchFriends')}/>
          </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: 40,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        width: '100%',
        padding: 20,
    },
    friendItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    friendAvatar: {
      fontSize: 24,
    },
    friendText: {
        fontSize: 18,
    },
});
