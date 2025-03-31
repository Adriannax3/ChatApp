import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "../components/ButtonRectangle";

export default function SettingsAppScreen() {
  const { theme, toggleTheme } = useTheme();

    return(
        <SafeAreaView style={[styles.sectionSettingsApp, { backgroundColor: theme.colors.backgroundColor }]}>
            <Text style={[styles.textH1, { color: theme.colors.color }]}>
                Ustawienia
            </Text>
            <View>
                <ButtonRectangle text={"Zmień motyw"} onPress={toggleTheme}/>
            </View>
        </SafeAreaView >
    );
};


const styles = StyleSheet.create({
    sectionSettingsApp: {
    paddingTop: 42,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  textH1: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});
