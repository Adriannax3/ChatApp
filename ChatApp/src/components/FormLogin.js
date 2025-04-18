import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "./ButtonRectangle";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const FormLogin = () => {
    const { theme } = useTheme();
    const { login, error, user } = useAuth();
    const navigation = useNavigation();

    const [loginData, setLoginData] = useState({
        login: 'jacek123',
        password: '1234567aB',
    });
    const [errorForm, setErrorForm] = useState(null);

    const handleChangeForm = (name, value) => {
        setLoginData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if(!loginData.login || !loginData.password) {
            setErrorForm("Uzupełnij wszystkie pola.")
            return;
        }

        //WALIDACJA LOGIN
        if(loginData.login.length < 3) {
            setErrorForm("Nazwa użytkownika musi mieć co najmniej 3 znaki.")
            return;
        }

        const loginRegex = /^[a-zA-Z0-9_]+$/;
        if (!loginRegex.test(loginData.login)) {
            setErrorForm('Nazwa użytkownika może zawierać tylko litery, cyfry i "_".');
            return;
        }

        setErrorForm(null);
        login(loginData.login, loginData.password, navigation);
    };

    return(
    <View style={styles.container}>
        <Text style={[styles.formTitle, {color: theme.colors.color}]}>Logowanie</Text>
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Login:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.login}
            onChangeText={text => handleChangeForm("login", text)}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Hasło:</Text>
        <TextInput 
            style={styles.input}
            value={loginData.password}
            onChangeText={text => handleChangeForm("password", text)}
            secureTextEntry={true}
        />
        {errorForm && <Text style={[styles.textError, {color: theme.colors.error}]}>{errorForm}</Text>}
        {error && <Text style={[styles.textError, {color: theme.colors.error}]}>{error}</Text>}
        <View>
            <ButtonRectangle onPress={handleSubmit} text={"Zaloguj się"}/>
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 20
    },
    input: {
        padding: 10,
        marginBottom: 5,
        width: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
    },
    inputLabel: {
        width: 250,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 400,
        letterSpacing: 1,
    },
    textError: {
        width: '100%',
        maxWidth: 300,
        fontSize: 18,
        textAlign: 'center'
    }
});

export default FormLogin;