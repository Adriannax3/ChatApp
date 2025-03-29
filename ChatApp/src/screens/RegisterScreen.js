import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "../components/ButtonRectangle";
import chatIconLight from '../assets/images/chat-icon-light.png';
import chatIconDark from '../assets/images/chat-icon-dark.png';
import FormLogin from "../components/FormLogin";
import FormRegister from "../components/FormRegister";

export default function RegisterScreen() {
  const { theme } = useTheme();


    return(
        <SafeAreaView style={[styles.sectionWelcomeScreen, { backgroundColor: theme.colors.backgroundColor }]}>
            <Image
                style={styles.chatIcon}
                source={theme.name === 'light' ? chatIconLight : chatIconDark}
            />
            <Text style={[styles.textH1, { color: theme.colors.color }]}>ChatApp</Text>
            <FormRegister />
        </SafeAreaView >
    );
};


const styles = StyleSheet.create({
  sectionWelcomeScreen: {
    paddingTop: 42,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  chatIcon: {
    marginTop: 10,
  },
  textH1: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});
