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
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
    setSuccess(null);
    setError(null);
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
      setSuccess("Zaproszenie wysłane!");
      fetchUsers();
    } catch (error) {
      console.error("Błąd przy wysyłaniu zaproszenia:", error);
      setError("Nie udało się wysłać zaproszenia.");
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
      {success && <Text style={[styles.textSuccess]}>{success}</Text>}
      {error && <Text style={[styles.textError, {color: theme.colors.error}]}>{error}</Text>}
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
  textError: {
        width: '100%',
        maxWidth: 300,
        fontSize: 18,
        textAlign: 'center'
  },
  textSuccess: {
      width: '100%',
      maxWidth: 300,
      fontSize: 18,
      textAlign: 'center',
      color: 'green'
  }
});

export default SearchFriends;
