import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "./ButtonRectangle";
import { useNavigation } from '@react-navigation/native';

const FormRegister = () => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const [loginData, setLoginData] = useState({
        login: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleChangeForm = (name, value) => {
        setLoginData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(loginData);
    };

    return(
    <View style={styles.container}>
        <Text style={[styles.formTitle, {color: theme.colors.color}]}>Rejestracja</Text>
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Login:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.login}
            onChangeText={text => handleChangeForm("login", text)}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Nazwa użytkownika:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.username}
            onChangeText={text => handleChangeForm("username", text)}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Hasło:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.password}
            onChangeText={text => handleChangeForm("password", text)}
            secureTextEntry={true}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Powtórz hasło:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.confirmPassword}
            onChangeText={text => handleChangeForm("confirmPassword", text)}
            secureTextEntry={true}
        />
        <View>
            <ButtonRectangle onPress={handleSubmit} text={"Zarejestruj się"}/>
        </View>
        <View>
            <ButtonRectangle onPress={() => navigation.navigate('Welcome')} text={"Powrót do logowania"}/>
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 20
    },
    input: {
        padding: 10,
        marginVertical: 10,
        width: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    inputLabel: {
        width: 250,
        fontSize: 16,
    },
    buttonWrapper: {
        backgroundColor: "#00ff00"
    }
});

export default FormRegister;