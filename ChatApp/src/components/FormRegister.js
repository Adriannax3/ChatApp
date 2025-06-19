import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { useTheme } from "../context/ThemeContext";
import ButtonRectangle from "./ButtonRectangle";
import AvatarPicker from "./AvatarPicker";
import axios from '../axios';


const FormRegister = () => {
    const { theme } = useTheme();

    const [registerData, setRegisterData] = useState({
        login: '',
        username: '',
        password: '',
        confirmPassword: '',
        avatar: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChangeForm = (name, value) => {
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAvatarSelect = (avatar) => {
        setRegisterData((prevState) => ({
          ...prevState,
          avatar: avatar,
        }));
      };

     const handleSubmit = async () => {
        setSuccess(null);

        if(!registerData.login || !registerData.username || !registerData.password || !registerData.confirmPassword) {
            setError("Uzupełnij wszystkie pola.")
            return;
        }

        if(registerData.password !== registerData.confirmPassword) {
            setError("Podane hasła różnią się.")
            return;
        }

        //WALIDACJA LOGIN
        if(registerData.login.length < 5) {
            setError("Login musi mieć co najmniej 5 znaków.")
            return;
        }

        const loginRegex = /^[a-zA-Z0-9]+$/;
        if (!loginRegex.test(registerData.login)) {
            setError('Login  może zawierać tylko litery, cyfry.');
            return;
        }

        //WALIDACJA USERNAME
        if(registerData.username.length < 3) {
            setError("Nazwa użytkownika musi mieć co najmniej 3 znaki.")
            return;
        }

        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(registerData.username)) {
            setError('Nazwa użytkownika może zawierać tylko litery, cyfry i "_".');
            return;
        }

        //WALIDACJA PASSWORD
        if (registerData.password.length < 8) {
            setError('Hasło musi mieć co najmniej 8 znaków.');
            return;
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(registerData.password)) {
          setError('Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę i jedną cyfrę.');
          return;
        }

        try {
            const res = await axios.post('/users', {
                login: registerData.login,
                username: registerData.username,
                password: registerData.password,
                avatar: registerData.avatar,
            });
            setRegisterData(prevState => ({
                ...prevState,
                login: '',
                username: '',
                password: '',
                confirmPassword: '',
                avatar: '',
            }));
            setError(null);
            setSuccess("Sukces! Utworzono konto.");
        }
        catch(error) {
            setError("Błąd: " + error.response.data.message);
        }
    };

    return(
    <View style={styles.container}>
        <Text style={[styles.formTitle, {color: theme.colors.color}]}>Rejestracja</Text>
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Login:</Text>
        <TextInput 
            style={styles.input}
            value={registerData.login}
            onChangeText={text => handleChangeForm("login", text)}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Nazwa użytkownika:</Text>
        <TextInput 
            style={styles.input}
            value={registerData.username}
            onChangeText={text => handleChangeForm("username", text)}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Hasło:</Text>
        <TextInput 
            style={styles.input}
            value={registerData.password}
            onChangeText={text => handleChangeForm("password", text)}
            secureTextEntry={true}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Powtórz hasło:</Text>
        <TextInput 
            style={styles.input}
            value={registerData.confirmPassword}
            onChangeText={text => handleChangeForm("confirmPassword", text)}
            secureTextEntry={true}
        />
        <Text style={[styles.inputLabel, {color: theme.colors.color}]}>Wybierz avatar:</Text>
        <AvatarPicker onSelect={handleAvatarSelect} />
        {error && <Text style={[styles.textError, {color: theme.colors.error}]}>{error}</Text>}
        {success && <Text style={[styles.textSuccess]}>{success}</Text>}
        <View>
            <ButtonRectangle onPress={handleSubmit} text={"Zarejestruj się"}/>
        </View>
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 500,
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginBottom: 5,
        width: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    inputLabel: {
        width: 250,
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 400,
        letterSpacing: 1,
    },
    buttonWrapper: {
        backgroundColor: "#00ff00"
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

export default FormRegister;