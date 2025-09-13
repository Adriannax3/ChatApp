import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import axios from '../axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ButtonRectangle from "../components/ButtonRectangle";

export default function FriendsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user, token } = useAuth();

  const [friends, setFriends] = useState([]);
  const [unread, setUnread] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const computeUnreadCounts = async (list) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const reqs = list.map(f =>
        axios.get('/messages', {
          headers,
          params: { fromUserId: f._id, toUserId: user._id }
        }).then(r => [f._id, r.data.filter(m => m.fromUserId === f._id && m.isRead === false).length])
      );
      const pairs = await Promise.all(reqs);
      setUnread(Object.fromEntries(pairs));
    } catch (e) {
      console.log("Błąd liczenia nieprzeczytanych:", e);
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`/friends`, { headers: { Authorization: `Bearer ${token}` } });
      setFriends(res.data);
      await computeUnreadCounts(res.data);
    } catch (err) {
      console.log("Błąd pobierania znajomych:", err);
      setError("Nie udało się pobrać znajomych.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (user) fetchFriends(); }, [user]);

  useFocusEffect(useCallback(() => { fetchFriends(); return () => {}; }, []));

  const renderItem = ({ item }) => {
    const count = unread[item._id] || 0;
    return (
      <Pressable
        style={({ pressed }) => [styles.friendItem, pressed && { backgroundColor: theme.colors.primary + '33' }]}
        onPress={() => navigation.navigate('Chat', { friend: item })}
      >
        <Text style={styles.friendAvatar}>{item.avatar}</Text>
        <Text style={[styles.friendText, { color: theme.colors.text }]}>{item.username}</Text>
        {count > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ color: theme.colors.text }}>Ładowanie znajomych...</Text>
        </View>
      ) : error ? (
        <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
          <Text style={{ color: theme.colors.error }}>{error}</Text>
        </View>
      ) : friends.length === 0 ? (
        <View style={[styles.loading, { backgroundColor: theme.colors.backgroundColor }]}>
          <Text style={{ color: theme.colors.error }}>Brak znajomych</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={[styles.text, { color: theme.colors.text }]}>Twoi znajomi</Text>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={friends}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </View>
      )}
      <View>
        <ButtonRectangle text="Zaproś znajomych" onPress={() => navigation.navigate('SearchFriends')} />
        <ButtonRectangle text="Zobacz oczekujące zaproszenia" onPress={() => navigation.navigate('Invitations')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: 40, alignItems: 'center', paddingBottom: 40 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { width: '100%' },
  listContainer: { flexGrow: 1, paddingHorizontal: 20, alignSelf: 'stretch' },
  friendItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', gap: 8 },
  friendAvatar: { fontSize: 24 },
  friendText: { fontSize: 18, flex: 1 },
  text: { fontSize: 20, fontWeight: '600', textAlign: 'center', marginVertical: 10, letterSpacing: 0.5 },
  badge: { minWidth: 22, paddingHorizontal: 6, height: 22, borderRadius: 11, backgroundColor: '#FF3B30', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '700' },
});
