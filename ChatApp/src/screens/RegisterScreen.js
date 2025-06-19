import React from "react";
import { SafeAreaView, Text, StyleSheet, Image, ScrollView, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "../components/ButtonRectangle";
import chatIconLight from '../assets/images/chat-icon-light.png';
import chatIconDark from '../assets/images/chat-icon-dark.png';
import settingIconLight from '../assets/images/settings-icon-light.png';
import settingIconDark from '../assets/images/settings-icon-dark.png';
import FormRegister from "../components/FormRegister";
import { useNavigation } from '@react-navigation/native';
import ButtonIcon from "../components/ButtonIcon";


export default function RegisterScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return(
      <SafeAreaView style={[styles.sectionRegisterScreen, { backgroundColor: theme.colors.backgroundColor }]}>
        <ScrollView 
            contentContainerStyle={styles.scrollViewRegisterScreen} 
            showsVerticalScrollIndicator={false}>
            <Image
                style={styles.chatIcon}
                source={theme.name === 'light' ? chatIconLight : chatIconDark}
            />
            <Text style={[styles.textH1, { color: theme.colors.color }]}>ChatApp</Text>
            <FormRegister />
            <View>
                <ButtonRectangle onPress={() => navigation.navigate('Welcome')} text={"Powrót do logowania"}/>
            </View>
            <ButtonIcon icon={theme.name === 'light' ? settingIconLight : settingIconDark} onPress={() => navigation.navigate('SettingsApp')}/>
          </ScrollView>
      </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  sectionRegisterScreen: {
    flex:1,
    paddingVertical: 42,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  scrollViewRegisterScreen: {
    width: '100%',
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
