import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const InvitationsScreen = () => {
  const { token } = useAuth();
  const { theme } = useTheme();

  const [receivedInvites, setReceivedInvites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceivedInvites();
  }, []);

  const fetchReceivedInvites = async () => {
    try {
      const res = await axios.get("/friends/invitations/received", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReceivedInvites(res.data);
    } catch (error) {
      console.error("Błąd pobierania zaproszeń:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (invitationId) => {
    try {
      await axios.post(
        `/friends/invitations/${invitationId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReceivedInvites();
    } catch (error) {
      console.error("Błąd akceptowania zaproszenia:", error);
    }
  };

  const rejectInvite = async (invitationId) => {
    try {
      await axios.post(
        `/friends/invitations/${invitationId}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReceivedInvites();
    } catch (error) {
      console.error("Błąd odrzucania zaproszenia:", error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Oczekujące zaproszenia
      </Text>

      {loading ? (
        <Text style={{ color: theme.colors.text }}>Ładowanie...</Text>
      ) : receivedInvites.length === 0 ? (
        <Text style={{ color: theme.colors.text }}>Brak zaproszeń</Text>
      ) : (
        <FlatList
          data={receivedInvites}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.inviteItem}>
              <Text style={[styles.username, { color: theme.colors.text }]}>
                {item.sender.username}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => acceptInvite(item._id)} style={styles.acceptBtn}>
                  <Text style={styles.acceptText}>Akceptuj</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => rejectInvite(item._id)} style={styles.rejectBtn}>
                  <Text style={styles.rejectText}>Odrzuć</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inviteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  username: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  acceptBtn: {
    backgroundColor: "green",
    padding: 6,
    borderRadius: 4,
  },
  rejectBtn: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 4,
  },
  acceptText: {
    color: "#fff",
    fontWeight: "bold",
  },
  rejectText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default InvitationsScreen;
