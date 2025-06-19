import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "../components/ButtonRectangle";
import chatIconLight from '../assets/images/chat-icon-light.png';
import chatIconDark from '../assets/images/chat-icon-dark.png';
import settingIconLight from '../assets/images/settings-icon-light.png';
import settingIconDark from '../assets/images/settings-icon-dark.png';
import FormLogin from "../components/FormLogin";
import ButtonIcon from "../components/ButtonIcon";
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();

    return(
      <SafeAreaView style={[styles.sectionWelcomeScreen, { backgroundColor: theme.colors.backgroundColor }]}>
            <Image
              style={styles.chatIcon}
              source={theme.name === 'light' ? chatIconLight : chatIconDark}
            />
            <Text  style={[styles.textH1, { color: theme.colors.color }]}>ChatApp</Text>
            <FormLogin />
            <View>
                <ButtonRectangle onPress={() => navigation.navigate('Register')} text={"Rejestracja"}/>
            </View>
            <ButtonIcon icon={theme.name === 'light' ? settingIconLight : settingIconDark} onPress={() => navigation.navigate('SettingsApp')}/>
      </SafeAreaView >
    )
};


const styles = StyleSheet.create({
  sectionWelcomeScreen: {
    paddingTop: 42,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
  },
  chatIcon: {
    width: 80,
    height: 80,
    marginTop: 10,
  },
  textH1: {
    fontSize: 28,
    fontWeight: 'bold'
  }
});
