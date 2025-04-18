import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0f0f0f" barStyle="light-content" />
      <Text style={styles.title}>⌁ NEXUS CHAT ⌁</Text>
      <Text style={styles.subtitle}> connected to: local mainframe</Text>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Chat")}
        >
          <Text style={styles.buttonText}>[ ENTER CHAT ]</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Friends")}
        >
          <Text style={styles.buttonText}>[ FRIENDS ]</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonText}>[ SETTINGS ]</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // terminal look
    paddingTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#00ff9f",
    fontFamily: "monospace",
    marginBottom: 10,
    textShadowColor: "#0ff",
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#ff00ff",
    fontFamily: "monospace",
    marginBottom: 40,
  },
  menu: {
    width: "80%",
  },
  button: {
    backgroundColor: "#1a1a1a",
    borderColor: "#00ff9f",
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 4,
    shadowColor: "#00ff9f",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "#00ff9f",
    fontSize: 16,
    fontFamily: "monospace",
    textAlign: "center",
  },
});
