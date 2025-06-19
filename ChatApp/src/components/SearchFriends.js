import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Text,
  TextInput,
} from "react-native";
import axios from "../axios";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
const SearchFriends = () => {
  const { user, token } = useAuth();
  const { theme } = useTheme();

  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/usersForInvite", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllUsers(res.data);
    } catch (error) {
      console.error("Błąd pobierania użytkowników:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = allUsers.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const sendFriendRequest = async (receiverId) => {
    try {
      await axios.post(
        "/friends/add",
        {
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Zaproszenie wysłane!");
      fetchUsers();
    } catch (error) {
      console.error("Błąd przy wysyłaniu zaproszenia:", error);
      alert("Nie udało się wysłać zaproszenia.");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.backgroundColor }]}>
      <TextInput
        style={styles.input}
        placeholder="Szukaj znajomych..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <Text>Ładowanie...</Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
                <View style={styles.userInfo}>
                <Text style={styles.avatar}>{item.avatar}</Text>
                <Text style={[styles.username, { color: theme.colors.text }]}>{item.username}</Text>
                </View>
              <TouchableOpacity
                style={[styles.inviteButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => sendFriendRequest(item._id)}
              >
                <Text style={[styles.inviteText, { color: theme.colors.text }]}>Zaproś</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    fontSize: 24,
    padding: 2,
  },    
  username: {
    fontSize: 16,
  },
  inviteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  inviteText: {
    fontWeight: "bold",
  },
});

export default SearchFriends;
