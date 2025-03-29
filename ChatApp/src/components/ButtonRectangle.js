import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from "../context/ThemeContext";

const ButtonRectangle = ({text, onPress}) => {
  const { theme } = useTheme();

    return(
    <SafeAreaView style={styles.container}>
        <TouchableOpacity
            style={[styles.buttonRectangle, {backgroundColor: theme.colors.primary}]}
            onPress={onPress}
            activeOpacity={0.98}
        >
        <Text
            style={[styles.buttonTxt, {color: theme.colors.color}]}
        >
            {text}
        </Text>
        </TouchableOpacity>
        <View style={[styles.viewAbsolute, {backgroundColor: theme.colors.backgroundButton}]}>
        </View>
    </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        position: 'relative',
        width: 200,
        margin: 8,
    },
    buttonRectangle: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontWeight: 'bold',
        fontSize: 18,
        zIndex: 2,
        width: '100%',
    },
    buttonTxt: {
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },
    viewAbsolute: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1,
        width: '100%',
        height: '100%',
    }
});

export default ButtonRectangle;